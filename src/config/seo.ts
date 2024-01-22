import { siteConfig } from '@/config/site';

export const siteMetadata = {
    metadataBase: new URL('https://deepfocused.vercel.app'),
    title: 'Deepfocused Homepage',
    description: siteConfig.description,
    keywords: [],
    authors: [
        {
            name: 'Deepfocused',
            url: 'https://github.com/Deepfocused',
        },
    ],
    creator: 'Deepfocused',
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: {
            url: siteConfig.ogImageUrl,
            width: 640,
            height: 480,
            alt: siteConfig.name,
        },
    },
    icons: {
        icon: '/favicon.png',
        apple: '/favicon.png',
    },
    appleWebApp: {
        title: 'for apple splash',
        startupImage: [
            {
                media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
                url: '/splashscreens/iphone5_splash.png',
            },
            {
                media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
                url: '/splashscreens/iphone5_splash.png',
            },
            {
                media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
                url: '/splashscreens/iphone6_splash.png',
            },
            {
                media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
                url: '/splashscreens/iphoneplus_splash.png',
            },
            {
                media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
                url: '/splashscreens/iphonex_splash.png',
            },
            {
                media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
                url: '/splashscreens/iphonexr_splash.png',
            },
            {
                media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
                url: '/splashscreens/iphonexsmax_splash.png',
            },
            {
                media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
                url: '/splashscreens/ipad_splash.png',
            },
            {
                media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
                url: '/splashscreens/ipadpro1_splash.png',
            },
            {
                media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
                url: '/splashscreens/ipadpro3_splash.png',
            },
            {
                media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
                url: '/splashscreens/ipadpro2_splash.png',
            },
        ],
    },
    manifest: '/manifest.webmanifest',
};
