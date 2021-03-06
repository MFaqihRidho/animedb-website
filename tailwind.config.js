module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                Lato: ["Lato", "sans-serif"],
            },
            colors: {
                dark_primary: "#03045E",
                dark_secondary: "#023E8A",
                light_primary: "#90E0EF",
                light_secondary: "#48CAE4",
            },
            maxWidth: {
                synopsis: "50ch",
                read: "28ch",
                mini: "15ch",
                superMini: "10ch",
            },
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
