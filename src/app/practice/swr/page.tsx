'use client';
/*
 SWR은 데이터를 가져오고 관리하면서 캐싱 및 자동 재요청 기능을 제공하는 라이브러리
 data : 캐시에서 데이터 반환 -> 서버에 데이터를 가져오는 요청 보냄 -> 최신 데이터 제공 / 동기식
*/
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import useSWR from 'swr';
import Loading from '@/components/structure/loading';
import Link from 'next/link';
import { useRef } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        '/api/data',
        fetcher,
    );
    const modalRef = useRef<any>();

    if (error)
        return (
            <div className="mb-28 mt-8">
                <div className="mx-auto max-w-lg text-center">
                    <p className="text-2xl font-bold sm:text-3xl">
                        SWR Example Code
                    </p>
                    <Link
                        href="/practice"
                        className="mt-6 inline-block rounded-2xl bg-pink-600 p-2 font-bold normal-case text-white transition hover:scale-110"
                    >
                        Back to Help For Develop
                    </Link>
                </div>
            </div>
        );
    if (!data)
        return (
            <>
                <div className="mb-28 mt-8">
                    <div className="mx-auto max-w-lg text-center">
                        <p className="text-2xl font-bold sm:text-3xl">
                            SWR Example Code
                        </p>
                        <Link
                            href="/practice"
                            className="mt-6 inline-block rounded-2xl bg-pink-600 p-2 font-bold normal-case text-white transition hover:scale-110"
                        >
                            Back to Help For Develop
                        </Link>
                    </div>
                </div>
                <Loading />
            </>
        );
    if (isLoading)
        return (
            <>
                <div className="mb-28 mt-8">
                    <div className="mx-auto max-w-lg text-center">
                        <p className="text-2xl font-bold sm:text-3xl">
                            SWR Example Code
                        </p>
                        <Link
                            href="/practice"
                            className="mt-6 inline-block rounded-2xl bg-pink-600 p-2 font-bold normal-case text-white transition hover:scale-110"
                        >
                            Back to Help For Develop
                        </Link>
                    </div>
                </div>
                <Loading />
            </>
        );

    const codeString = `    'use client'
    import useSWR from 'swr'
    import Loading from "@/components/structure/loading";
    
    const fetcher = (url) => fetch(url).then((res) => res.json());
    
    export default function Home() {
    
        const {data, error, isLoading, isValidating, mutate} = useSWR(
            '/api/data', fetcher);
    
        if (error) return null;
        if (!data) return <Loading/>;
        if (isLoading) return <Loading/>;
        
        return (
            <div>
                <p>{data.message}</p>
            </div>);
    }`;
    return (
        <div className="mb-28 mt-8">
            <div className="mx-auto max-w-lg text-center">
                <p className="text-2xl font-bold sm:text-3xl">
                    SWR Example Code
                </p>
                <Link
                    href="/practice"
                    className="mt-6 inline-block rounded-2xl bg-pink-600 p-2 font-bold normal-case text-white transition hover:scale-110"
                >
                    Back to Help For Develop
                </Link>
            </div>
            <div className="mt-3 flex items-center justify-center">
                <div className="w-2/3 rounded-lg p-4 shadow-lg">
                    <SyntaxHighlighter
                        language="javascript"
                        style={ocean}
                        showLineNumbers={true}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-center">
                <button
                    className="rounded-2xl bg-pink-700 p-4 font-bold normal-case text-white transition hover:scale-110"
                    onClick={() => modalRef.current.showModal()}
                >
                    RUN
                </button>
                <dialog
                    ref={modalRef}
                    className="modal modal-bottom sm:modal-middle"
                >
                    <form method="dialog" className="modal-box">
                        <p className="text-lg font-bold">SWR Result!</p>
                        <p className="py-4">{data.message}</p>
                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="rounded-2xl bg-pink-700 p-4 font-bold normal-case text-white transition hover:scale-110">
                                Close
                            </button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
}
