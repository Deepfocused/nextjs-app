'use client';
/*
비동기
https://hoon1994.tistory.com/80
*/
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Loading from '@/components/structure/loading';
import Link from 'next/link';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['sample'],
        queryFn: () => fetcher('/api/data'),
    });
    const modalRef = useRef<any>();

    if (error)
        return (
            <div className="mb-28 mt-8">
                <div className="mx-auto max-w-lg text-center">
                    <p className="text-2xl font-bold sm:text-3xl">
                        ReactQuery Example Code
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
                            ReactQuery Example Code
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
                            ReactQuery Example Code
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
    
        const {isLoading, isError, data, error} = useQuery({
            queryKey: ['data'], queryFn: () => fetcher('/api/data'),
        });
    
        if (isError) return null;
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
                    ReactQuery Example Code
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
                        <p className="text-lg font-bold">ReactQuery Result!</p>
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
