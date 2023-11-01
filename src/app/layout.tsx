// import localFont from 'next/font/local';
import {Inter as InterFont} from 'next/font/google';
import '@/styles/globals.css';
import {siteMetadata} from '@/config/seo';
import {ReactNode, Suspense} from 'react';
import Nav from '@/components/structure/nav';
import Footer from '@/components/structure/footer';
import NavigationEvents from '../components/structure/navigation-events';
import ThemeProviders from '../components/provider/themeproviders';
import Loading from './loading';
import GoogleAnalytics from '@/libs/googleanalytics';
import RQProviders from '@/components/provider/reactqueryproviders';
import {Viewport} from 'next';
//import RecoilProviders from '../components/provider/recoil';

export const metadata = {...siteMetadata};
export const viewport: Viewport = {
    // themeColor: [
    //     { media: '(prefers-color-scheme: light)', color: 'black' },
    //     { media: '(prefers-color-scheme: dark)', color: 'white' },
    // ],
    themeColor: 'black',
    colorScheme: 'dark',
};
// const mainFont = localFont({
//     src: [
//         {
//             path: '../../public/font/nanum-barun-gothic/NanumBarunGothicUltraLight.ttf',
//             weight: '400',
//             style: 'normal',
//         },
//         {
//             path: '../../public/font/nanum-barun-gothic/NanumBarunGothicBold.ttf',
//             weight: '700',
//             style: 'normal',
//         },
//     ],
//     display: 'swap',
// });

const interFont = InterFont({
    subsets: ['latin'],
    display: 'swap',
    preload: false,
});
/*
Passing data between a parent layout and its children is not possible.
However, you can fetch the same data in a route more than once,
and React will automatically dedupe the requests without affecting performance.
*/

// 반드시 default 붙여아한다.
export default function RootLayout({children}: { children: ReactNode }) {
    return (
        // Note! If you do not add suppressHydrationWarning to your <html>
        // you will get warnings because next-themes updates that element.
        // This property only applies one level deep, so it won't block hydration warnings on other elements.
        // suppressHydrationWarning 쓰기
        // https://eunhee-programming.tistory.com/205
        <html
            suppressHydrationWarning
            lang="en"
            className={interFont.className}
        >
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
            <GoogleAnalytics
                GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID}
            />
        )}
        {/*<body className="container mx-auto">*/}
        <body className="body-scrollbar container mx-auto cursor-default">
        {/*<RecoilProviders>*/}
        <ThemeProviders>
            <header>
                <Nav/>
            </header>
            <main>
                <RQProviders>{children}</RQProviders>
            </main>
            <Footer/>
            <Suspense fallback={<Loading/>}>
                <NavigationEvents/>
            </Suspense>
        </ThemeProviders>
        {/*</RecoilProviders>*/}
        </body>
        </html>
    );
}
