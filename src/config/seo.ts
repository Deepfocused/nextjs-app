import { siteConfig } from '@/config/site';

export const siteMetadata = {
    metadataBase: new URL('https://deepfocused.vercel.app'),
    title: 'Deepfocused',
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
    },
    manifest: '/site.webmanifest',
};
