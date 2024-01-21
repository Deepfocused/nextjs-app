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
        other: [
            {
                url: 'splashscreens/iphone5_splash.png',
                media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
                rel: 'apple-touch-startup-image',
            },
            {
                url: 'splashscreens/iphoneplus_splash.png',
                media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
                rel: 'apple-touch-startup-image',
            },
            {
                url: 'splashscreens/ipad_splash.png',
                media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
                rel: 'apple-touch-startup-image',
            },
        ],
    },
    manifest: '/manifest.webmanifest',
};
