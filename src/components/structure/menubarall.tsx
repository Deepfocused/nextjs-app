'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

function MenubarAll() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<any>(null);
    const buttonRef = useRef<any>(null);
    const svgRef = useRef<any>(null);
    const pathRef = useRef<any>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        // 메뉴 판 외부를 클릭했을 때 메뉴를 숨기자
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                event.target !== buttonRef.current &&
                event.target !== svgRef.current &&
                event.target !== pathRef.current
            ) {
                setIsOpen(false);
            }
        }

        // 이벤트 리스너를 추가
        document.addEventListener('click', handleClickOutside);
        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative z-[21]">
            <div
                ref={buttonRef}
                onClick={toggleDropdown}
                className="border-1 hover:border-1 mx-0.5 flex cursor-pointer rounded-xl border border-green-200 bg-base-100 p-3 font-bold text-green-500 shadow-xl shadow-green-300/10 transition hover:scale-110 hover:border hover:border-green-200 hover:bg-base-100 active:text-green-700 active:shadow-green-300"
            >
                {/*svg, path는 직접 ref를 달아줘야 눌렀을시 동작함*/}
                <svg
                    ref={svgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        ref={pathRef}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
            </div>

            <div className="absolute" ref={menuRef}>
                {isOpen && (
                    <ul className="menu rounded-box menu-sm z-[21] mt-3 w-56 border-green-300 bg-base-100 p-1 font-bold shadow-xl shadow-green-300">
                        <li>
                            <Link href="/" onClick={closeDropdown}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                onClick={closeDropdown}
                                scroll={false}
                                prefetch={false}
                            >
                                Portfolio
                            </Link>
                        </li>
                        <li>
                            <Link href="/practice" onClick={closeDropdown}>
                                Help For Develop
                            </Link>
                        </li>
                        <li>
                            <Link href="/humanmatting" onClick={closeDropdown}>
                                <p className="text-left">🔴</p>
                                HumanMatting
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/humanmattingbetter"
                                onClick={closeDropdown}
                            >
                                <p className="text-left">🟠</p>
                                HumanMatting better
                            </Link>
                        </li>
                        <li>
                            <Link href="/facedetection" onClick={closeDropdown}>
                                <p className="text-left">🟢</p>
                                FaceDetection
                            </Link>
                        </li>
                        <li>
                            <Link href="/vad" onClick={closeDropdown}>
                                <p className="text-left">🔵</p>
                                VoiceActivityDetection
                            </Link>
                        </li>
                        <li>
                            <Link href="/posedetection" onClick={closeDropdown}>
                                <p className="text-left">🟣</p>
                                PoseDetection
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default MenubarAll;
