/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    }, 
    reactStrictMode: true,
    webpack: (config, {}) => {
        config.resolve.extensions.push('.ts', '.tsx');
        config.resolve.fallback = { fs: false };

        config.plugins.push(
            new NodePolyfillPlugin(),
            new CopyPlugin({
                patterns: [
                    {
                        from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
                        to: 'static/chunks',
                    },
                    {
                        from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
                        to: 'static/chunks',
                    },
                ],
            }),
        );
        return config;
    },
};

module.exports = nextConfig;
