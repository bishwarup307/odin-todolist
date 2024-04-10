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
            dxl: "1980px",
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
                textPrimaryLight: "hsl(197, 94%, 20%)",
                textPrimaryLighter: "hsl(197, 94%, 30%)",
                textPrimaryLightest: "hsl(197, 94%, 97%)",
                bgPrimary: "hsl(211, 70%, 20%)",
                bgLighter: "hsl(211, 70%, 40%)",
                bgLight: "hsl(211, 70%, 60%)",
                bgExtraLight: "hsl(211, 70%, 80%)",
                bgLightest: "hsl(211, 70%, 90%)",
                accent: "hsl(196, 24%, 46%)",
                "accent-600": "hsl(196, 24%, 76%)",
                ashGray: "hsl(126, 15%, 72%)",
                beige: "hsl(79, 55%, 92%)",
                child: "#FFC107",
                education: "#4CAF50",
                family: "#475dd8",
                finance: "#f2c643",
                health: "#F44336",
                home: "#795548",
                learning: "#9C27B0",
                personal: "#b33af4",
                professional: "#03A9F4",
            },
            boxShadow: {
                task: "inset 6px 0px var(--shadow-color), 2px 2px 10px var(--shadow-color-alpha), 0px 6px 10px var(--shadow-color-alpha)",
            },
        },
    },
    plugins: ["flowbite/plugin"],
};
