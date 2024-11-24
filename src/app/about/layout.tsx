import { ReactNode } from 'react';
import Sidebar from '@/app/about/structure/sidebar';
import Navbar from '@/app/about/structure/navbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto mb-28 px-4 pt-8 sm:px-6 lg:px-8">
            <div className="text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
                <p className="text-2xl font-bold sm:text-3xl">
                    Deepfocused Portfolio
                </p>
                <p className="mt-1.5 text-sm text-gray-400 max-[319px]:text-xs">
                    🎉 Your efforts will never betray you 🎉
                </p>
            </div>
            <div className="mt-8 grid grid-cols-12 gap-5 px-4">
                {/* // do this div style later (after putting the content) */}
                <div
                    // rounded-xl border border-pink-300 shadow-xl shadow-pink-300/10 transition hover:shadow-pink-300
                    className="col-span-12 rounded-2xl border border-2 border-blue-300 p-4 text-center text-base shadow-xl shadow-blue-300 lg:col-span-3"
                >
                    {/* //!sidebar */}
                    <Sidebar />
                </div>
                <div className="border col-span-12 flex flex-col rounded-l-2xl border-2 border-blue-300 shadow-xl shadow-blue-300 lg:col-span-9">
                    {/* //!navbar */}
                    <Navbar />
                    {children}
                    {/* //!about */}
                </div>
            </div>
        </div>
    );
}
