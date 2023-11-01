'use client';

import {BsGeoAltFill} from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import {Karla, Slackey} from 'next/font/google';
import {memo, useEffect, useState} from 'react';
import profilePic from '../../../../public/images/me.jpg'

const nameFont = Slackey({
    weight: ['400'],
    subsets: ['latin'],
    // style: ['italic'],
    display: 'swap',
    preload: false,
});

const mailFont = Karla({
    weight: ['500'],
    subsets: ['latin'],
    // style: ['italic'],
    display: 'swap',
    preload: false,
});

const Sidebar = () => {
    const [email, setEmail] = useState<boolean>(false);

    useEffect(() => {
        setEmail(true);
    }, []);

    return (
        <>
            <Image
                src={profilePic}
                alt="Picture of Deepfocused"
                className="mx-auto rounded-3xl"
                placeholder="blur"
                width={192}
                height={192}
                quality={100}
                priority={true}
                unoptimized={false}
            />

            <p className="mt-6 text-4xl/10">
                <span className={`${nameFont.className} ${'text-blue-400'}`}>
                    Jonggon
                </span>
                <span className={`${nameFont.className} ${'text-blue-200'}`}>
                    {' '}
                    Kim
                </span>
            </p>
            <p className="-ml-4 -mr-4 mt-6 bg-base-300 py-0.5">
                <span
                    className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-xl font-bold text-transparent">
                    AI
                </span>
                <span className="text-xl font-bold">&nbsp;/&nbsp;</span>
                <span
                    className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-xl font-bold text-transparent">
                    Web Developer
                </span>
            </p>

            {/* Resume */}
            {/*<Link*/}
            {/*    href="resume/Jonggon Resume.pdf"*/}
            {/*    download="Jonggon Resume.pdf"*/}
            {/*    className="flex items-center justify-center px-2 py-1 my-2 bg-gray-200 rounded-full cursor-pointer dark:bg-dark-200 dark:bg-black-500"*/}
            {/*>*/}
            {/*    <GiTie className="w-6 h-6"/>*/}
            {/*    <span>Download Resume</span>*/}
            {/*</Link>*/}

            {/* Socials */}
            <div className="mx-auto mt-6 flex flex w-9/12 justify-around md:w-full">
                <Link
                    href="https://github.com/Deepfocused"
                    target="_blank"
                    className="transition hover:scale-110"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="rgb(192, 132, 252, 1)"
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        />
                    </svg>
                </Link>
                <Link
                    href="https://www.linkedin.com/in/kim-jonggon-37ba19120/"
                    target="_blank"
                    className="transition hover:scale-110"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="rgb(192, 132, 252, 1)"
                            d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"
                        />
                    </svg>
                </Link>
            </div>

            {/* Contacts */}
            <div className="-ml-4 -mr-4 mt-6 bg-base-300 px-2 py-0.5">
                {/*나중에 지역표시도 하자*/}
                <div className="flex items-center justify-center py-0.5">
                    <BsGeoAltFill className="mr-2"/>
                    <span>Seoul </span>
                </div>
                <p className={`${mailFont.className} ${'my-2'}`}>
                    rlawhdrhs27@gmail.com{' '}
                </p>
            </div>

            {/* Email Button */}
            <div className="relative h-[10rem]">
                <button
                    className="absolute inset-x-1/4 inset-y-1/3 w-6/12  cursor-pointer rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white transition hover:scale-110"
                    onClick={
                        email
                            ? () =>
                                window.open(
                                    'mailto:code.rlawhdrhs27@gmail.com',
                                )
                            : () => {
                            }
                    }
                >
                    <span className="text-base">Email me</span>
                </button>
            </div>
        </>
    );
};

export default memo(Sidebar);
