/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#21BF48",
        primaryHover: "#1da543",
        primaryActive: "#1b8f3b",
        primaryDisabled: "#A7D7B7",

        secondary: "#2F80ED",
        secondaryHover: "#1F66D0",
        secondaryActive: "#174CA6",
        secondaryDisabled: "#B9D3F4",

        textMain: "#111827",
        textSub: "#6B7280",
        background: "#F9FAFB",
      },
      fontFamily: {
        noto: ['"Noto Sans KR"', "sans-serif"],
        suit: ['"SUIT"', "sans-serif"],
      },
    },
    screens: {
      ss: "480px",
      sm: "620px",
      sl: "768px",
      md: "1060px",
      lg: "1200px",
    },
  },
  corePlugins: {
    preflight: true,
  },
};
