/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    // purge: ["./src/**/*.html", "./src/**/*.{js, jsx, ts, tsx}"],
    content: [
        "./src/**/*.{html,js}",
        "./node_modules/flowbite/**/*.js",
        // "./node_modules/flowbite-datepicker/**/*.js",
    ],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            backgroundImage: {
                hero: "url('/src/assets/hero.png')",
            },
            fontFamily: {
                sans: ["Karla", "sans-serif"],
                fa: "Font Awesome 5 Free",
            },
            colors: {
                textPrimary: "hsl(197, 94%, 10%)",
                bgPrimary: "hsl(211, 70%, 20%)",
                bgLighter: "hsl(211, 70%, 40%)",
                bgLight: "hsl(211, 70%, 60%)",
                bgExtraLight: "hsl(211, 70%, 80%)",
                accent: "hsl(196, 24%, 46%)",
                "accent-600": "hsl(196, 24%, 76%)",
                ashGray: "hsl(126, 15%, 72%)",
                beige: "hsl(79, 55%, 92%)",
            },
        },
    },
    plugins: ["flowbite/plugin"],
};
