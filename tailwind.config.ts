import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saath: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
          950: "#042F2E",
        },
        coral: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          500: "#F43F5E",
          600: "#E11D48",
        },
        sage: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
        warm: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          hover: "#F1F5F9",
          text: "#0F172A",
          muted: "#64748B",
        }
      },
      fontFamily: {
        sans: ["'Noto Sans Devanagari'", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["'Baloo 2'", "var(--font-outfit)", "system-ui", "sans-serif"],
        marathi: ["'Noto Sans Devanagari'", "'Baloo 2'", "sans-serif"],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 20px -2px rgba(15, 118, 110, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 16px 36px -6px rgba(15, 118, 110, 0.12), 0 6px 16px -3px rgba(0, 0, 0, 0.04)',
        'story': '0 4px 14px 0 rgba(13, 148, 136, 0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
};
export default config;
