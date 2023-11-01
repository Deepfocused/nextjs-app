'use client';

// https://codevoweb.com/setup-react-context-api-in-nextjs-13-app-directory/
import { useEffect, memo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
// import {useRecoilValue} from 'recoil';
// import {webCamStateAtom} from '../../utils/recoilatoms';

function NavigationEvents() {
    const pathname = usePathname();
    // const WebCamStateAtom = useRecoilValue(webCamStateAtom);
    //const searchParams = useSearchParams()
    console.log(pathname);
    // useEffect(() => {
    //     // video가 켜있으면 끄기
    //     // if (pathname !== '/humanmattingtf') {
    //     //     // console.log(WebCamStateAtom);
    //     // }
    // }, [pathname]);

    return null;
}

export default memo(NavigationEvents);
