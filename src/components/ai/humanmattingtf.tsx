'use client';
import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import type { ModelInfo } from '@/types';
import * as tf from '@tensorflow/tfjs';
import { Rank } from '@tensorflow/tfjs';
import Loading from '@/components/structure/loading';
import '@tensorflow/tfjs-backend-wasm';
// import '@tensorflow/tfjs-backend-webgpu';
// 처음에 recoil 사용해서 하려고 했으나, useLayoutEffect을 사용하면 될일 이었음.
// import {useSetRecoilState} from 'recoil';
// import {webCamStateAtom} from '../../utils/recoilatoms';

/*
useLayoutEffect을 사용해야 페이지간 이동시 return이 동작
useEffect는 return 동작 안함
둘다 다른 페이지로 넘어가는 경우 현재 페이지에서 null이 나올수 있는 값들에 대해서는 null처리(?처리) 해줘야함.
 */

function HumanmattingTF({ backendName, modelPath }: ModelInfo) {
    const [playing, setPlaying] = useState<boolean>(false);
    // false : front camera / true : rear camera whene mobile
    const [cameraSelect, setCameraSelect] = useState<boolean>(false);
    const cameraFrontRef = useRef<any>(null);
    const cameraRearRef = useRef<any>(null);
    //const setWebCamStateAtom = useSetRecoilState(webCamStateAtom);
    const videoRef = useRef<any>(null);
    const canvasRef1 = useRef<any>(null);
    const canvasRef2 = useRef<any>(null);
    const inputRef = useRef<any>(null);
    const inferenceRef = useRef<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // 비동기 처리1 - backend, Model Loading 하기
    const setENV: (name: string) => void = async (name) => {
        await tf.setBackend(name);
        console.log(`Backend is ${tf.getBackend()}`);
    };

    // 비동기 처리2 - canvas에 그리기  하기
    const drawResult = useCallback<
        (
            image: tf.Tensor,
            alpha: tf.Tensor,
            background: tf.Tensor,
            canvasHeight: number,
            canvasWidth: number,
        ) => void
    >(async (image, alpha, background, canvasHeight, canvasWidth) => {
        const result: tf.Tensor<Rank>[] = tf.tidy(() => {
            const pha = alpha.squeeze().expandDims(2); //float32
            const pha255 = tf.mul(pha, 255);
            const one = tf.onesLike(pha);
            const rgb = tf.add(
                tf.mul(pha, image),
                tf.mul(tf.sub(one, pha), background),
            );
            const opacity = one.mul(255);
            return [
                tf.concat([rgb, opacity], 2),
                tf.concat([pha255, pha255, pha255, opacity], 2),
            ];
        });
        image.dispose();
        alpha.dispose();
        background.dispose();

        // result를 resize하면 될듯~
        const resizeResult = result[0].resizeBilinear([
            canvasHeight,
            canvasWidth,
        ]);
        const resizeAlphaResult = result[1].resizeBilinear([
            canvasHeight,
            canvasWidth,
        ]);

        const [height, width] = resizeResult.shape.slice(0, 2);
        const pixelData = new Uint8ClampedArray(await resizeResult.data()); //
        const pixelDataAlpha = new Uint8ClampedArray(
            await resizeAlphaResult.data(),
        ); //
        // ui 안멈추게 하려고 비동기로 가져온다
        const imageData = new ImageData(pixelData, width, height);
        const imageDataAlpha = new ImageData(pixelDataAlpha, width, height);

        const hmContext = canvasRef1.current?.getContext('2d');
        const alphaContext = canvasRef2.current?.getContext('2d');

        hmContext.clearRect(0, 0, width, height);
        hmContext.putImageData(imageData, 0, 0);

        alphaContext.clearRect(0, 0, width, height);
        alphaContext.putImageData(imageDataAlpha, 0, 0);

        tf.dispose([result, resizeResult, resizeAlphaResult]);
    }, []);

    // 비동기 처리3 - 배경이미지 로딩하기
    const loadImageAsync = useCallback<
        (path: string) => Promise<tf.Tensor<Rank>>
    >((path) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
                const tensor = tf.browser.fromPixels(img);
                const background = tf.image.resizeBilinear(tensor, [384, 384]);
                tf.dispose(tensor);
                resolve(background);
            };
            img.onerror = (e) => {
                reject(e);
            };
        });
    }, []);

    // 비동기 처리4 - model inference
    const inference = useCallback<(path: string, select: boolean) => void>(
        async (path, select) => {
            canvasRef1.current.style.display = 'block';
            canvasRef2.current.style.display = 'block';

            // 카메라 1개만 선택하기
            let deviceId = '';
            let cameraCount = 0; // deviceId가 안나오는 경우도 있다.
            for (const camera of await navigator.mediaDevices.enumerateDevices()) {
                if (camera.kind.startsWith('video')) {
                    deviceId = camera.deviceId;
                    cameraCount += 1;
                    break;
                }
            }

            // 내 모델은 384x384x3 을 입력으로 받음
            if (inferenceRef.current && cameraCount > 0) {
                let webcam;
                if (deviceId !== '')
                    webcam = await tf.data.webcam(videoRef.current, {
                        deviceId,
                        resizeWidth: 384,
                        resizeHeight: 384,
                        facingMode: !select ? 'user' : 'environment',
                    });
                else
                    webcam = await tf.data.webcam(videoRef.current, {
                        resizeWidth: 384,
                        resizeHeight: 384,
                        facingMode: !select ? 'user' : 'environment',
                    });

                // 배경 이미지 미리 Load 하기
                // https://www.youtube.com/watch?v=kSSycUT0r1M
                const url = '/images/sample.jpg';
                const background = await loadImageAsync(url);

                // model loading
                const model = await tf.loadGraphModel(path);

                // model에 입력되는 rnn state 초기값
                let [hi1, hi2, hi3, hi4] = [
                    tf.zeros([1, 20, 24, 24]),
                    tf.zeros([1, 16, 48, 48]),
                    tf.zeros([1, 12, 96, 96]),
                    tf.zeros([1, 10, 192, 192]),
                ];

                // Inference loop
                while (inferenceRef.current) {
                    const canvasHeight = canvasRef1.current?.height;
                    const canvasWidth = canvasRef1.current?.width;
                    await tf.nextFrame();
                    // 중간에 inferRef.current가 바뀐다.
                    if (inferenceRef.current) {
                        let img: any;
                        try {
                            img = await webcam.capture();
                        } catch (error) {
                            if (img) img.dispose();
                            continue;
                        }
                        const input = tf.tidy(() => img.expandDims(0).div(255)); // normalize input
                        const [output, ho1, ho2, ho3, ho4] = model.execute(
                            { input, hi1, hi2, hi3, hi4 }, // provide inputs
                            ['output', 'ho1', 'ho2', 'ho3', 'ho4'], // select outputs
                        ) as tf.Tensor<Rank>[];

                        await drawResult(
                            img.clone(),
                            output.clone(),
                            background.clone(),
                            canvasHeight,
                            canvasWidth,
                        );
                        // Dispose old tensors, Update recurrent states.
                        // dispose 안해주면 메모리 치솟음
                        tf.dispose([img, input, output, hi1, hi2, hi3, hi4]);
                        [hi1, hi2, hi3, hi4] = [ho1, ho2, ho3, ho4];
                    }
                }
                tf.dispose([hi1, hi2, hi3, hi4, background]);
                if (
                    canvasRef1.current !== null &&
                    canvasRef2.current !== null
                ) {
                    canvasRef1.current.style.display = 'none';
                    canvasRef2.current.style.display = 'none';
                }
                webcam.stop();
                model.dispose();
            }
        },
        [],
    );

    // tensorflow.js backend / windowResizeListener 초기화
    useEffect(() => {
        setENV(backendName);

        const windowResizeListener = () => {
            canvasRef1.current.width = Math.floor(window.innerWidth * 0.41);
            canvasRef1.current.height = Math.floor(window.innerHeight * 0.5);

            canvasRef2.current.width = canvasRef1.current.width;
            canvasRef2.current.height = canvasRef1.current.height;
        };
        windowResizeListener();
        window.addEventListener('resize', windowResizeListener);
        return () => {
            window.removeEventListener('resize', windowResizeListener);
        };
    }, []);

    // useLayoutEffect을 사용해야 한다.
    useLayoutEffect(() => {
        if (playing) {
            setLoading(true);
            inferenceRef.current = true;
            inference(modelPath, cameraSelect);

            inputRef.current.disabled = true;
            cameraFrontRef.current.disabled = true;
            cameraRearRef.current.disabled = true;
            setTimeout(() => {
                inputRef.current.disabled = false;
                cameraFrontRef.current.disabled = false;
                cameraRearRef.current.disabled = false;
                setLoading(false); // 다른 버튼을 비활성화하기 위함
            }, 2100);
        }

        return () => {
            if (videoRef.current.srcObject !== null) {
                setLoading(false);
                inferenceRef.current = false;
                if ('getTracks' in videoRef.current.srcObject) {
                    videoRef.current.srcObject
                        .getTracks()
                        .forEach((track: MediaStreamTrack) => {
                            track.stop();
                        });
                }
            }
        };
    }, [playing, cameraSelect]);
    return (
        <div className="mb-28">
            <div className="mt-7 grid items-center justify-center">
                <label
                    htmlFor="AcceptConditions"
                    className="relative h-8 w-14 cursor-pointer"
                    onChange={() => setPlaying(!playing)}
                >
                    <input
                        ref={inputRef}
                        type="checkbox"
                        id="AcceptConditions"
                        className="peer sr-only"
                    />
                    <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-red-500"></span>
                    <span className="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
                </label>
            </div>
            <div className="mt-6 grid items-center justify-center">
                <div className="badge badge-neutral hidden sm:block">
                    Human Matting Algorithm made by Deepfocused Using
                    TensorflowJS
                </div>
            </div>
            <div className="mb-3 mt-4 grid items-center justify-center">
                <label className="label cursor-pointer">
                    <span className="label-text mr-10 text-red-700">
                        Front Camera
                    </span>
                    <input
                        ref={cameraFrontRef}
                        onChange={useCallback(() => setCameraSelect(false), [])}
                        type="radio"
                        className=":z-[1] relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-red-700 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-red-700 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-red-700 checked:after:bg-red-700 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] checked:focus:border-red-700 checked:focus:before:scale-100"
                        defaultChecked
                    />
                </label>
                <label className="label cursor-pointer">
                    <span className="label-text mr-10 text-blue-700">
                        Rear Camera
                    </span>
                    <input
                        ref={cameraRearRef}
                        onChange={useCallback(() => setCameraSelect(true), [])}
                        type="radio"
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-blue-700 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-blue-700 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-blue-700 checked:after:bg-blue-700 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] checked:focus:border-blue-700 checked:focus:before:scale-100"
                    />
                </label>
            </div>
            {loading ? <Loading /> : null}
            <div className="flex items-center justify-center">
                <canvas
                    ref={canvasRef1}
                    style={{
                        transform: 'scaleX(-1)',
                    }}
                ></canvas>
                <canvas
                    ref={canvasRef2}
                    style={{
                        transform: 'scaleX(-1)',
                    }}
                ></canvas>
                <video
                    ref={videoRef}
                    height="1080"
                    width="1920"
                    style={{
                        display: 'none',
                        transform: 'scaleX(-1)',
                    }}
                    autoPlay
                />
            </div>
        </div>
    );
}

export default memo(HumanmattingTF);
