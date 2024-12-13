'use client';

import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import { motion } from 'framer-motion';

function VadONNX({ modelPath }: { modelPath: string }) {
    const [playing, setPlaying] = useState<boolean>(false);
    const [speaking, setSpeaking] = useState<boolean>(false);

    const inputRef = useRef<any>(null);
    const inferenceRef = useRef<boolean>(false);
    const audioRef = useRef<any>(null);

    const inference = useCallback<(modelPath: string) => void>(
        async (modelPath) => {
            const session = await InferenceSession.create(modelPath, {
                executionProviders: ['wasm'],
                graphOptimizationLevel: 'all',
            });
            const chunkSize = 1536;
            const sampleRate = 16000;
            const threshold = 0.3;

            const constraints = {
                audio: true,
            };
            try {
                audioRef.current = await navigator.mediaDevices.getUserMedia(
                    constraints,
                );
                if (audioRef.current) {
                    const audioContext = new AudioContext({ sampleRate });
                    const mediaStreamSource =
                        audioContext.createMediaStreamSource(audioRef.current);
                    const analyser = audioContext.createAnalyser();
                    analyser.connect(audioContext.destination);
                    mediaStreamSource.connect(analyser);

                    // 입력 만들기
                    const feeds: Record<string, Tensor> = {};
                    const input = new Float32Array(chunkSize);
                    feeds[session.inputNames[1]] = new Tensor(
                        new BigInt64Array([BigInt(sampleRate)]),
                        [1],
                    );
                    feeds[session.inputNames[2]] = new Tensor(
                        new Float32Array(2 * 1 * 64),
                        [2, 1, 64],
                    ); // (2, 1, 64)
                    feeds[session.inputNames[3]] = new Tensor(
                        new Float32Array(2 * 1 * 64),
                        [2, 1, 64],
                    ); // (2, 1, 64)

                    const captureAudioData = async () => {
                        analyser.getFloatTimeDomainData(input);
                        if (inferenceRef.current) {
                            feeds[session.inputNames[0]] = new Tensor(input, [
                                1,
                                chunkSize,
                            ]);
                            //1536 만큼만 넣어두자
                            const outputData = await session.run(feeds);
                            feeds[session.inputNames[2]] =
                                outputData[session.outputNames[1]]; // (2, 1, 64)
                            feeds[session.inputNames[3]] =
                                outputData[session.outputNames[2]]; // (2, 1, 64)

                            const result =
                                outputData[session.outputNames[0]].data;
                            if (Number(result[0]) > threshold)
                                // why? Number(result[0]) because of typescript
                                setSpeaking(true);
                            else setSpeaking(false);

                            // ui적으로 잘 보이기 위함
                            setTimeout(() => {
                                requestAnimationFrame(captureAudioData);
                            }, 100);
                            // requestAnimationFrame(captureAudioData);
                        }
                    };
                    await captureAudioData();
                }
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        },
        [],
    );

    // useLayoutEffect을 사용해야 한다.
    useLayoutEffect(() => {
        if (playing) {
            inferenceRef.current = true;
            inference(modelPath);
            inputRef.current.disabled = true;
            setTimeout(() => {
                inputRef.current.disabled = false;
            }, 500);
        }

        return () => {
            if (audioRef.current) {
                setSpeaking(false);
                inferenceRef.current = false;
                audioRef.current
                    .getAudioTracks()
                    .forEach((track: MediaStreamTrack) => track.stop());
            }
        };
    }, [playing]);

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
                    Voice Detection Algorithm made by Deepfocused Using
                    Onnxruntime(wasm)
                </div>
            </div>
            <div className="mt-16 flex items-center justify-center">
                {playing &&
                    (speaking ? <HighEnergyCube2 /> : <LowEnergyCube2 />)}
                {playing &&
                    (speaking ? <HighEnergyCube1 /> : <LowEnergyCube1 />)}
                {playing &&
                    (speaking ? <HighEnergyCube2 /> : <LowEnergyCube2 />)}
                {!playing && <DeactivatedCube2 />}
                {!playing && <DeactivatedCube1 />}
                {!playing && <DeactivatedCube2 />}
            </div>
            <div className="mt-20 grid items-center justify-center">
                {!playing && (
                    <p className="badge badge-warning badge-lg">
                        😿Deactivated😿
                    </p>
                )}
                {playing &&
                    (speaking ? (
                        <p className="badge badge-success badge-lg">
                            😿Speaking😿
                        </p>
                    ) : (
                        <p className="badge badge-info badge-lg">
                            😿Not Speaking😿
                        </p>
                    ))}
            </div>
            <div className="mt-4 grid items-center justify-center">
                <div className="rounded-2xl bg-red-400 p-1 text-sm text-black">
                    😿if not Working, Press F5 and Wait for about 3 seconds😿
                </div>
            </div>
        </div>
    );
}

const HighEnergyCube1 = () => {
    return (
        <motion.div className="high-energy-spin ml-10 mr-10 h-48 w-48 rounded-[10px] bg-gradient-to-l from-[#F2CB61] to-[#F15F5F]" />
    );
};

const HighEnergyCube2 = () => {
    return (
        <motion.div className="high-energy-spin ml-10 mr-10 hidden h-48 w-48 rounded-[10px] bg-gradient-to-l from-[#6799FF] to-[#47C83E] md:block" />
    );
};

const LowEnergyCube1 = () => {
    return (
        <motion.div className="low-energy-spin ml-10 mr-10 h-48 w-48 rounded-[10px] bg-gradient-to-l from-[#F2CB61] to-[#F15F5F]" />
    );
};

const LowEnergyCube2 = () => {
    return (
        <motion.div className="low-energy-spin ml-10 mr-10 hidden h-48 w-48 rounded-[10px] bg-gradient-to-l from-[#6799FF] to-[#47C83E] md:block" />
    );
};

const DeactivatedCube1 = () => {
    return (
        <div className="ml-10 mr-10 h-48 w-48 rounded-[10px] bg-gradient-to-l from-[#2A2A2A] to-[#474747]" />
    );
};
const DeactivatedCube2 = () => {
    return (
        <div className="ml-10 mr-10 hidden h-48 w-48 rounded-[10px] bg-gradient-to-l from-[#2A2A2A] to-[#474747] md:block" />
    );
};

export default memo(VadONNX);
