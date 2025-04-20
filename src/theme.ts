import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "'Playfair Display', serif",
        body: "'Alice', serif",
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
    },
    styles: {
        global: {
            "html, body": {
                bg: "#242424",
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
