export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImageUrl: string;
    links: {
        github: string;
    };
};

export type ModelInfo = {
    backendName: string;
    modelPath: string;
};
