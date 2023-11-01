// https://www.npmjs.com/package/nextjs-google-analytics
import Link from 'next/link';

export default function Home() {
    return (
        <div className="mx-auto mb-28 px-4 pt-8 sm:px-6 lg:px-8">
            <div className="grid gap-y-8 lg:gap-x-16">
                <div className="text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
                    <p className="text-2xl font-bold sm:text-3xl">
                        Welcome to Deepfocused Home
                    </p>
                    <p className="mt-1.5 text-sm text-gray-400 max-[319px]:text-xs">
                        🎉 Welcome to Deepfocused world 🎉
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-1 md:gap-12 lg:grid-cols-1">
                    <Link
                        className="border-1 block rounded-xl border border-blue-300 p-8 shadow-xl shadow-blue-300/10 transition hover:scale-105 hover:shadow-blue-300"
                        href="/about"
                        scroll={false}
                        prefetch={false}
                    >
                        <span className="inline-block rounded-lg p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-blue-500"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                />
                            </svg>
                        </span>
                        <p className="mt-2 font-bold text-blue-300">
                            Portfolio
                        </p>
                        <p className="mt-1 block text-sm text-gray-400">
                            about my career
                        </p>
                    </Link>

                    <Link
                        className="border-1 block rounded-xl border border-pink-300 p-8 shadow-xl shadow-pink-300/10 transition hover:scale-105 hover:shadow-pink-300"
                        href="/practice"
                    >
                        <span className="inline-block rounded-lg p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-pink-500"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="m11.239 15.533c-1.045 3.004-1.238 3.451-1.238 3.84 0 .441.385.627.627.627.272 0 1.108-.301 3.829-1.249zm.888-.888 3.22 3.22 6.408-6.401c.163-.163.245-.376.245-.591 0-.213-.082-.427-.245-.591-.58-.579-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245zm-3.127-.895c0-.402-.356-.75-.75-.75-2.561 0-2.939 0-5.5 0-.394 0-.75.348-.75.75s.356.75.75.75h5.5c.394 0 .75-.348.75-.75zm5-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75z"
                                />
                            </svg>
                        </span>

                        <p className="mt-2 font-bold text-pink-300">
                            Help For Develop
                        </p>

                        <p className="mt-1 block text-sm text-gray-400">
                            For React or Next Development
                        </p>
                    </Link>

                    <div className="border-1 block rounded-xl border border-green-300 p-8 shadow-xl shadow-green-300/10 transition hover:scale-105 hover:shadow-green-300">
                        <span className="inline-block rounded-lg p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-green-500"
                                viewBox="0 0 24 24"
                                // fill="rgb(34, 197, 94, 1)"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M24 11.374c0 4.55-3.783 6.96-7.146 6.796-.151 1.448.061 2.642.384 3.641l-3.72 1.189c-.338-1.129-.993-3.822-2.752-5.279-2.728.802-4.969-.646-5.784-2.627-2.833.046-4.982-1.836-4.982-4.553 0-4.199 4.604-9.541 11.99-9.541 7.532 0 12.01 5.377 12.01 10.374zm-21.992-1.069c-.145 2.352 2.179 3.07 4.44 2.826.336 2.429 2.806 3.279 4.652 2.396 1.551.74 2.747 2.37 3.729 4.967l.002.006.111-.036c-.219-1.579-.09-3.324.36-4.528 3.907.686 6.849-1.153 6.69-4.828-.166-3.829-3.657-8.011-9.843-8.109-6.302-.041-9.957 4.255-10.141 7.306zm8.165-2.484c-.692-.314-1.173-1.012-1.173-1.821 0-1.104.896-2 2-2s2 .896 2 2c0 .26-.05.509-.141.738 1.215.911 2.405 1.855 3.6 2.794.424-.333.96-.532 1.541-.532 1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5c-1.171 0-2.155-.807-2.426-1.895-1.201.098-2.404.173-3.606.254-.17.933-.987 1.641-1.968 1.641-1.104 0-2-.896-2-2 0-1.033.784-1.884 1.79-1.989.12-.731.252-1.46.383-2.19zm2.059-.246c-.296.232-.66.383-1.057.417l-.363 2.18c.504.224.898.651 1.079 1.177l3.648-.289c.047-.267.137-.519.262-.749l-3.569-2.736z"
                                />
                            </svg>
                        </span>

                        <p className="mt-2 font-bold text-green-300">
                            AI Contents
                        </p>

                        <Link
                            href="/humanmatting"
                            className="mr-3 mt-2 inline-block rounded-2xl bg-red-500 px-3 py-1 text-center text-sm font-bold normal-case text-white transition hover:scale-110"
                        >
                            HumanMatting
                        </Link>
                        <Link
                            href="/humanmattingbetter"
                            className="mr-3 mt-2 inline-block rounded-2xl bg-orange-500 px-3 py-1 text-sm font-bold normal-case text-white transition hover:scale-110"
                        >
                            HumanMatting Better
                        </Link>
                        <Link
                            href="/facedetection"
                            className="mr-3 mt-2 inline-block rounded-2xl bg-green-500 px-3 py-1 text-center text-sm font-bold normal-case text-white transition hover:scale-110"
                        >
                            Face Detection
                        </Link>
                        <Link
                            href="/vad"
                            className="mr-3 mt-2 inline-block rounded-2xl bg-blue-500 px-3 py-1 text-sm font-bold normal-case text-white transition hover:scale-110"
                        >
                            <span>Voice Activity Detection</span>
                        </Link>
                        <Link
                            href="/posedetection"
                            className="mr-3 mt-2 inline-block rounded-2xl bg-purple-500 px-3 py-1 text-center text-sm font-bold normal-case text-white transition hover:scale-110"
                        >
                            Pose Detection
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
