'use client';

// https://github.com/xiaotiandada/blog/issues/94 - 참고
import { memo, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
// 동적으로 tailwind 사용하자
// https://velog.io/@arthur/Tailwind-CSS-%EC%97%90%EC%84%9C-%EB%8F%99%EC%A0%81%EC%9C%BC%EB%A1%9C-%ED%81%B4%EB%9E%98%EC%8A%A4-%ED%95%A0%EB%8B%B9%ED%95%98%EA%B8%B0
function ThemeSwitch() {
    const { theme, themes, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<any>(null);
    const buttonRef = useRef<any>(null);
    const svgRef = useRef<any>(null);
    const pathRef = useRef<any>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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
        <div className="relative z-[21] mr-2.5 text-left">
            <div
                ref={buttonRef}
                onClick={toggleDropdown}
                className="border-1 hover:border-1 flex w-28 cursor-pointer items-center justify-center rounded-xl border border-orange-200 bg-base-100 p-0 py-2.5 font-bold normal-case text-orange-500 shadow-xl shadow-orange-300/10 transition hover:scale-110 hover:border hover:border-orange-200 hover:bg-base-100 active:text-orange-700 active:shadow-orange-300"
            >
                themes&nbsp;
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
                        strokeWidth="1"
                        d="m17.5 11c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm-5.979 5c.043.522.153 1.025.321 1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm3.704-.024 1.442 1.285c.095.085.215.127.333.127.136 0 .271-.055.37-.162l2.441-2.669c.088-.096.131-.217.131-.336 0-.274-.221-.499-.5-.499-.136 0-.271.055-.37.162l-2.108 2.304-1.073-.956c-.096-.085-.214-.127-.333-.127-.277 0-.5.224-.5.499 0 .137.056.273.167.372zm-2.598-3.976c-.328.456-.594.96-.785 1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm7.373-3.25c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                    />
                </svg>
            </div>
            <div className="absolute" ref={menuRef}>
                {isOpen && (
                    <ul className="menu rounded-box menu-sm z-[21] mt-3 w-28 border-orange-300 bg-base-100 font-bold shadow-xl shadow-orange-300">
                        {themes.slice(0, themes.length - 1).map(
                            (
                                opt,
                                key, // eslint-disable-next-line react/jsx-key
                            ) => (
                                <li key={key}>
                                    <button onClick={() => setTheme(opt)}>
                                        {theme === opt ? '✅ ' : null}
                                        {opt}
                                    </button>
                                </li>
                            ),
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default memo(ThemeSwitch);
