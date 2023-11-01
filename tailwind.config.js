/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ], // 끄기
    corePlugins: {
        preflight: true,
    },
    theme: {},
    plugins: [require('daisyui')], // daisyUI config (optional - here are the default values)
    // https://daisyui.com/docs/config/
    daisyui: {
        themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    },
};
