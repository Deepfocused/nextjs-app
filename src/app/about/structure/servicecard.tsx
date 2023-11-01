'use client'; // 사실 about/page에서 했으므로 안해도 됨

import { Wendy_One } from 'next/font/google';
import { Service } from '@/app/about/structure/types';
import { memo } from 'react';

const titleFont = Wendy_One({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
    preload: false,
});

// https://velog.io/@nemo/string-to-jsx - 참고하기
const Servicecard = ({ Icon, title, about }: Service) => {
    return (
        <div className="box flex items-center space-x-4 space-y-0.5">
            <Icon className="h-12 w-12 text-blue-400" />
            <div>
                <p className={`${titleFont.className} ${'text-xl'}`}>{title}</p>
                <p
                    dangerouslySetInnerHTML={{ __html: about }}
                    className="text-md mt-1"
                ></p>
            </div>
        </div>
    );
};

export default memo(Servicecard);
