/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.{js, jsx, ts, tsx}"],
    content: ["./src/**/*.{html,js}"],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            fontFamily: {
                albert: ["Albert Sans", "sans-serif"],
            },
            colors: {
                textPrimary: "hsl(197, 94%, 6%)",
                bgPrimary: "hsl(197, 66%, 20%)",
                bgLighter: "hsl(197, 66%, 35%)",
                bgLight: "hsl(197, 66%, 45%)",
                accent: "hsl(196, 24%, 46%)",
                ashGray: "hsl(126, 15%, 72%)",
                beige: "hsl(79, 55%, 92%)",
            },
        },
    },
    plugins: [],
};
