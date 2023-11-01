import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitch from './theme';
import MenubarAll from './menubarall';
import MenubarAi from '@/components/structure/menuai';
// import dynamic from 'next/dynamic'
// const Provider = dynamic(() => import('../themeproviders'), {ssr: true})
// const ThemeSwitch = dynamic(() => import('@/components/theme'), {ssr: true})

// https://tailwindui.com/components/application-ui/elements/dropdowns#component-f8a14da22f26a67757b19f2fe3ca00ed
function Nav() {
    return (
        <nav className="border-b-2">
            <div className="navbar bg-base-100">
                <div className="navbar-start min-[640px]:hidden">
                    <MenubarAll />
                    <Link
                        href="/"
                        className="border-1 hover:border-1 flex rounded-xl border border-gray-200 bg-base-100 p-1 font-bold text-gray-500 shadow-xl shadow-gray-300/10 transition hover:scale-110 hover:border hover:border-gray-200 hover:bg-base-100 active:text-gray-700 active:shadow-gray-300"
                    >
                        Home
                    </Link>
                </div>
                <div className="navbar-start max-[640px]:hidden lg:flex">
                    <ul className="menu-horizontal menu-sm px-1">
                        <li>
                            <Link
                                href="/"
                                className="border-1 hover:border-1 mr-3 mt-1 flex rounded-xl border border-gray-200 bg-base-100 p-3 font-bold text-gray-500 shadow-xl shadow-gray-300/10 transition hover:scale-110 hover:border hover:border-gray-200 hover:bg-base-100 active:text-gray-700 active:shadow-gray-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                scroll={false}
                                prefetch={false}
                                className="border-1 hover:border-1 mr-3 mt-1 flex rounded-xl border border-blue-200 bg-base-100 p-3 font-bold text-blue-500 shadow-xl shadow-blue-300/10 transition hover:scale-110 hover:border hover:border-blue-200 hover:bg-base-100 active:text-blue-700 active:shadow-blue-300"
                            >
                                Portfolio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/practice"
                                className="border-1 hover:border-1 mt-1 flex rounded-xl border border-pink-200 bg-base-100 p-3 font-bold text-pink-500 shadow-xl shadow-pink-300/10 transition hover:scale-110 hover:border hover:border-pink-200 hover:bg-base-100 active:text-pink-700 active:shadow-pink-300"
                            >
                                Help&nbsp;For&nbsp;Develop
                            </Link>
                        </li>
                        <li>
                            <MenubarAi />
                        </li>
                    </ul>
                </div>
                {/*z index 우선순위 높임*/}
                <div className="navbar-end">
                    <ThemeSwitch />
                    <div className="avatar w-14 sm:block">
                        <div className="mask mask-squircle w-full">
                            <Image
                                src="https://avatars.githubusercontent.com/u/149566442?v=4"
                                alt="Picture of Deepfocused"
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUk2OtBwABZQDCADJyswAAAABJRU5ErkJggg=="
                                width={256}
                                height={256}
                                quality={100}
                                priority={true}
                                unoptimized={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
