import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "'Nunito', sans-serif",
        body: "'Nunito', sans-serif",
        fredoka: "'Fredoka', sans-serif",
    },
    fontWeights: {
        normal: 400,
        medium: 600,
        semibold: 700,
        extrabold: 800,
        black: 900,
    },
    colors: {
        brand: {
            50: "#ffe6f0",
            100: "#ffb3cc",
            200: "#ff80a6",
            300: "#ff4d80",
            400: "#ff1a59",
            500: "#e60040",
            600: "#b30030",
            700: "#800020",
            800: "#4d0010",
            900: "#1a0005",
        },
        background: {
            dark: "#121212",
            light: "#ffffff",
        },
        pinkTheme: {
            100: "#ffb3cc",
            500: "#ff1a59",
            700: "#b30030",
        },
        darkSurface: {
            900: "#121212", // Main background
            800: "#1E1E1E", // Surface
            700: "#2C2C2C", // Border
        },
        gray: {
            100: "#EDEDED", // Text Primary
            300: "#A8A8A8", // Text Secondary
        },
    },
    styles: {
        global: {
            "html, body": {
                bg: "darkSurface.900",
                color: "#ffb3cc",
            },
            a: {
                color: "#ff1a59",
                _hover: {
                    color: "#b30030",
                },
            },
        },
    },
});

export default theme;
