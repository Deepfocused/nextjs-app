'use client';

import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { InferenceSession, Tensor } from 'onnxruntime-web';

function FacedetectionONNX({ modelPath }: { modelPath: string }) {
    const [playing, setPlaying] = useState<boolean>(false);
    const canvasInferenceRef = useRef<any>(null);
    const canvasResultRef = useRef<any>(null);
    const [cameraSelect, setCameraSelect] = useState<boolean>(false);
    const cameraFrontRef = useRef<any>(null);
    const cameraRearRef = useRef<any>(null);

    const inputRef = useRef<any>(null);
    const inferenceRef = useRef<boolean>(false);
    const videoRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const inference = useCallback<(modelPath: string, select: boolean) => void>(
        async (modelPath, select) => {
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

            if (inferenceRef.current && cameraCount > 0) {
                let constraints;

                const session = await InferenceSession.create(modelPath, {
                    executionProviders: ['wasm'], // wasm이 호환성 최고, webgl is not good
                    graphOptimizationLevel: 'all',
                });

                const [targetHeight, targetWidth] = [384, 384];

                if (deviceId !== '') {
                    constraints = {
                        video: {
                            deviceId,
                            facingMode: !select ? 'user' : 'environment',
                        },
                    };
                } else {
                    constraints = {
                        video: {
                            facingMode: !select ? 'user' : 'environment',
                        },
                    };
                }
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(
                        constraints,
                    );
                    videoRef.current.srcObject = stream;
                    if (stream) {
                        const infernceContext =
                            canvasInferenceRef.current?.getContext('2d', {
                                willReadFrequently: true,
                            });
                        const resultContext =
                            canvasResultRef.current?.getContext('2d');
                        const originLength = targetWidth * targetHeight * 4;
                        const rgbLength = targetWidth * targetHeight * 3;
                        const feeds: Record<string, Tensor> = {};

                        const [redArray, greenArray, blueArray] = [
                            new Array<number>(),
                            new Array<number>(),
                            new Array<number>(),
                        ];
                        const inputArray = new Float32Array(rgbLength);

                        let firstFrame = true; // 깜빡임 방지
                        const drawCanvas = async () => {
                            if (inferenceRef.current) {
                                const targetCanvasHeight =
                                    canvasResultRef.current?.height;
                                const targetCanvasWidth =
                                    canvasResultRef.current?.width;

                                infernceContext.clearRect(
                                    0,
                                    0,
                                    targetWidth,
                                    targetHeight,
                                );
                                infernceContext.drawImage(
                                    videoRef.current,
                                    0,
                                    0,
                                    targetWidth,
                                    targetHeight,
                                );
                                const captureImage =
                                    infernceContext.getImageData(
                                        0,
                                        0,
                                        targetWidth,
                                        targetHeight,
                                    );

                                // 입력 데이터 만들기
                                const captureImageData = captureImage.data;
                                for (let i = 0; i < originLength; i += 4) {
                                    redArray.push(captureImageData[i]);
                                    greenArray.push(captureImageData[i + 1]);
                                    blueArray.push(captureImageData[i + 2]);
                                }
                                const rgbArray = redArray
                                    .concat(greenArray)
                                    .concat(blueArray);

                                // 초기화 - 다음번을 위함
                                redArray.length = 0;
                                greenArray.length = 0;
                                blueArray.length = 0;

                                for (let i = 0; i < rgbLength; i++) {
                                    inputArray[i] = rgbArray[i] / 255.0; // convert to float
                                }

                                feeds[session.inputNames[0]] = new Tensor(
                                    inputArray,
                                    [1, 3, targetHeight, targetWidth],
                                );
                                const outputData = await session.run(feeds);
                                // const id: any = outputData[session.outputNames[0]].data;
                                // const score: any = outputData[session.outputNames[1]].data;
                                const bbox: any =
                                    outputData[session.outputNames[2]].data;
                                const landmark: any =
                                    outputData[session.outputNames[3]].data;
                                infernceContext.fillStyle =
                                    'rgba(255, 121, 121, 0.33)';
                                infernceContext.fillRect(
                                    bbox[0],
                                    bbox[1],
                                    bbox[2] - bbox[0],
                                    bbox[3] - bbox[1],
                                );

                                infernceContext.strokeStyle =
                                    'rgba(33, 255, 33, 1)';
                                for (let i = 0; i < landmark.length; i += 2) {
                                    infernceContext.beginPath();
                                    infernceContext.arc(
                                        landmark[i],
                                        landmark[i + 1],
                                        1,
                                        0,
                                        2 * Math.PI,
                                    );
                                    infernceContext.stroke();
                                }
                                if (!firstFrame) {
                                    resultContext.clearRect(
                                        0,
                                        0,
                                        targetCanvasWidth,
                                        targetCanvasHeight,
                                    );
                                    firstFrame = false;
                                }
                                resultContext.drawImage(
                                    canvasInferenceRef.current,
                                    0,
                                    0,
                                    targetCanvasWidth,
                                    targetCanvasHeight,
                                );
                                requestAnimationFrame(drawCanvas);
                            } else {
                                resultContext.clearRect(
                                    0,
                                    0,
                                    canvasResultRef.current?.width,
                                    canvasResultRef.current?.height,
                                );
                                if (canvasResultRef.current !== null)
                                    canvasResultRef.current.style.backgroundColor =
                                        'black';
                            }
                        };
                        await drawCanvas();
                    }
                } catch (error) {
                    console.error('Error accessing webcam:', error);
                }
            }
        },
        [],
    );

    useEffect(() => {
        const windowResizeListener = () => {
            canvasResultRef.current.width = Math.floor(window.innerWidth * 0.5);
            canvasResultRef.current.height = Math.floor(
                window.innerHeight * 0.5,
            );
            const resultContext = canvasResultRef.current?.getContext('2d');
            resultContext.fillRect(
                0,
                0,
                canvasResultRef.current.width,
                canvasResultRef.current.height,
            );
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
            }, 500);
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
                    Face Detection Algorithm made by Deepfocused Using
                    Onnxruntime(wasm)
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
                        name="selectCamera"
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-red-700 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-red-700 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-red-700 checked:after:bg-red-700 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] checked:focus:border-red-700 checked:focus:before:scale-100"
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
                        name="selectCamera"
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-blue-700 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-blue-700 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-blue-700 checked:after:bg-blue-700 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] checked:focus:border-blue-700 checked:focus:before:scale-100"
                    />
                </label>
            </div>
            {/*{loading ? <Loading /> : null}*/}
            <div className="flex items-center justify-center">
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
                <canvas
                    ref={canvasInferenceRef}
                    height="384"
                    width="384"
                    style={{
                        display: 'none',
                        transform: 'scaleX(-1)',
                    }}
                />
                <canvas
                    ref={canvasResultRef}
                    style={{
                        transform: 'scaleX(-1)',
                    }}
                />
            </div>
            {loading ? (
                <div className="mt-4 grid items-center justify-center">
                    <div className="badge badge-info">😿Loading😿</div>
                </div>
            ) : null}
            {playing ? (
                <>
                    <div className="mt-4 grid items-center justify-center">
                        <div className="badge badge-success">😿Playing😿</div>
                    </div>
                    <div className="mt-4 grid items-center justify-center">
                        <div className="rounded-2xl bg-red-400 p-1 text-sm text-black">
                            😿if not Working, Press F5 and Wait for about 3
                            seconds😿
                        </div>
                    </div>
                </>
            ) : (
                <div className="mt-4 grid items-center justify-center">
                    {mounted ? (
                        <div className="badge badge-warning">
                            😿Deactivated😿
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default memo(FacedetectionONNX);
