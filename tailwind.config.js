import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px",
        disabledOpacity: 0.5,
        fontSize: {
          tiny: "0.75rem", // 12px
          small: "0.875rem", // 14px
          medium: "1rem", // 16px
          large: "1.125rem", // 18px
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem",
        },
        radius: {
          small: "6px",
          medium: "8px",
          large: "12px",
        },
        borderWidth: {
          small: "1px",
          medium: "1px",
          large: "2px",
        },
      },
      themes: {
        dark: {
          colors: {
            background: {
              DEFAULT: "#0F172A",
            },
            content1: {
              DEFAULT: "#1E293B",
              foreground: "#F8FAFC",
            },
            content2: {
              DEFAULT: "#334155",
              foreground: "#F8FAFC",
            },
            content3: {
              DEFAULT: "#475569",
              foreground: "#F8FAFC",
            },
            content4: {
              DEFAULT: "#64748B",
              foreground: "#F8FAFC",
            },
            divider: {
              DEFAULT: "rgba(255, 255, 255, 0.1)",
            },
            focus: {
              DEFAULT: "#FF5722",
            },
            foreground: {
              50: "#1E293B",
              100: "#334155",
              200: "#475569",
              300: "#64748B",
              400: "#94A3B8",
              500: "#CBD5E1",
              600: "#E2E8F0",
              700: "#F1F5F9",
              800: "#F8FAFC",
              900: "#FFFFFF",
              DEFAULT: "#F8FAFC",
            },
            overlay: {
              DEFAULT: "#000000",
            },
            primary: {
              50: "#4D1600",
              100: "#662000",
              200: "#992F00",
              300: "#CC3F00",
              400: "#FF4F00",
              500: "#FF5722",
              600: "#FF784E",
              700: "#FF9A7A",
              800: "#FFBCA5",
              900: "#FFDDD2",
              DEFAULT: "#FF5722",
              foreground: "#FFFFFF",
            },
            default: {
              50: "#1E293B",
              100: "#334155",
              200: "#475569",
              300: "#64748B",
              400: "#94A3B8",
              500: "#CBD5E1",
              600: "#E2E8F0",
              700: "#F1F5F9",
              800: "#F8FAFC",
              900: "#FFFFFF",
              DEFAULT: "#64748B",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
