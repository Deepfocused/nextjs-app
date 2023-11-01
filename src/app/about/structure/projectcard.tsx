'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { IProject } from './types';
import Link from 'next/link';

import Image from 'next/image';
import { VscGithubInverted } from 'react-icons/vsc';
import { IoLogoVercel } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { Frank_Ruhl_Libre } from 'next/font/google';
import { IoMdCloseCircle } from 'react-icons/io';

// const nameFont = Frank_Ruhl_Libre({
//     weight: ['500'],
//     subsets: ['latin'], // style: ['italic'],
//     display: 'swap',
// });

const cardFont = Frank_Ruhl_Libre({
    weight: ['900'],
    subsets: ['latin'], // style: ['italic'],
    display: 'swap',
    preload: false,
});

const Projectcard = ({
    name,
    image_path,
    deployed_url,
    description,
    github_url,
    key_techs,
}: IProject) => {
    const [showDetail, setShowDetail] = useState(false);
    const startPosition = useRef<any>([0, 0]); // x, y좌표
    const cardRef = useRef<any>(null);
    const imageRef = useRef<any>(null);
    const nameRef = useRef<any>(null);
    const blockRef = useRef<any>(null);

    useEffect(() => {
        function handleClickOutside(event: KeyboardEvent | MouseEvent) {
            if (event.target === blockRef.current) {
                setShowDetail(false);
            }

            if ('key' in event && event.key === 'Escape') {
                setShowDetail(false);
            }
        }

        function projectClick(event: MouseEvent) {
            // childNodes는 기존 html에서 코딩한 방식 / react에서는 ref를 쓰겠다.
            if (
                event.target === imageRef.current ||
                event.target === nameRef.current
            ) {
                const [windowX, windowY] = [
                    window.innerWidth,
                    window.innerHeight,
                ];
                const cardRefInfo = cardRef.current.getBoundingClientRect();
                const [cardCenterX, cardTopY] = [
                    cardRefInfo.left + cardRefInfo.width / 2,
                    cardRefInfo.top - cardRefInfo.height / 2,
                ];
                const [targetCenterX, targetTopY] = [
                    windowX / 2,
                    windowY * 0.15,
                ];

                startPosition.current = [
                    cardCenterX - targetCenterX,
                    cardTopY - targetTopY,
                ];
            }
        }

        // 이벤트 리스너를 추가
        document.addEventListener('keydown', handleClickOutside);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', projectClick);
        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
        return () => {
            document.removeEventListener('keydown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', projectClick);
        };
    }, []);

    // 팝업시 바깥 스크롤동작 금지시키기
    useEffect(() => {
        if (showDetail) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showDetail]);
    return (
        <>
            <div ref={cardRef} onClick={() => setShowDetail(true)}>
                <Image
                    src={image_path}
                    ref={imageRef}
                    alt={name}
                    className="mx-auto cursor-pointer rounded-2xl"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPc6wMAAcwBC31ULI0AAAAASUVORK5CYII="
                    width={640}
                    height={480}
                    quality={100}
                    // priority={true}
                    unoptimized={false}
                />
                <div
                    ref={nameRef}
                    className="cursor-pointer text-center text-base font-bold text-white max-[319px]:text-sm"
                >
                    {name}
                </div>
            </div>
            {/*z index는 큰걸로 해놓자*/}
            {showDetail && (
                <div
                    className="fixed inset-0 z-[20] h-full w-full bg-gray-700 bg-opacity-50"
                    ref={blockRef}
                />
            )}
            <AnimatePresence>
                {showDetail && (
                    <motion.div
                        key={crypto.getRandomValues(new Uint32Array(1))[0]}
                        className="projects-scrollbar fixed left-[calc(100%/6)] top-[15%] z-[21] h-[36%] w-8/12 cursor-grab overflow-y-scroll rounded-l-2xl bg-gradient-to-r from-blue-200 to-purple-300 p-2 text-black md:h-[44%] lg:h-[34%] xl:h-[38%] 2xl:h-[42%]"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{
                            scale: [0.5, 0.75, 1],
                            opacity: [0.0, 0.5, 1],
                            x: [startPosition.current[0], 0],
                            y: [startPosition.current[1], 0],
                        }}
                        transition={{
                            type: 'spring',
                        }}
                        exit={{
                            opacity: [1, 0.5, 0.0],
                            scale: [1, 0.75, 0.5],
                            x: [0, startPosition.current[0]],
                            y: [0, startPosition.current[1]],
                        }}
                    >
                        <div className="sticky right-0 top-0 flex justify-end rounded-2xl text-right focus:outline-none">
                            <IoMdCloseCircle
                                className="cursor-pointer"
                                onClick={() => setShowDetail(false)}
                                size={30}
                            />
                        </div>
                        <div className="grid gap-x-4 lg:grid-cols-2">
                            <div>
                                <Image
                                    src={image_path}
                                    alt={name}
                                    placeholder="blur"
                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUk2OtBwABZQDCADJyswAAAABJRU5ErkJggg=="
                                    className="mx-auto rounded-2xl"
                                    width={640}
                                    height={480}
                                    quality={100}
                                    priority={true}
                                    unoptimized={false}
                                />
                                <div className="mt-2 flex justify-center">
                                    <Link
                                        href={github_url}
                                        target="_blank"
                                        className="mr-6 flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 p-2 text-sm font-bold text-white max-[340px]:mr-3 max-[340px]:p-1 max-[340px]:text-xs"
                                    >
                                        <VscGithubInverted />{' '}
                                        <span>Github</span>
                                    </Link>
                                    <Link
                                        href={deployed_url}
                                        target="_blank"
                                        className="flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 p-2 text-sm font-bold text-white max-[340px]:p-1 max-[340px]:text-xs"
                                    >
                                        <IoLogoVercel /> <span>Deployed</span>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <p
                                    className={`${
                                        cardFont.className
                                    } ${'mb-2'} ${'text-2xl'} ${'flex-wrap'} ${'font-bold'} ${'max-[350px]:text-xl'}`}
                                >
                                    {name}
                                </p>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                    className="mb-2"
                                ></p>
                                <div className="mt-2 flex flex-wrap text-sm">
                                    {key_techs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="my-1.5 mr-4 rounded-xl bg-base-300/5 p-1 font-bold"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(Projectcard);
