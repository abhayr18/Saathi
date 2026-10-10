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
          50: "#FFF8F1",
          100: "#FEEDDF",
          200: "#FED7BA",
          300: "#FDBA8C",
          400: "#FB9355",
          500: "#F46A25",
          600: "#E34D14",
          700: "#BB380D",
          800: "#942E11",
          900: "#772812",
          950: "#411107",
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
          bg: "#FAF9F6",
          card: "#FFFFFF",
          border: "#EAE5DC",
          hover: "#F5EFE6",
          text: "#1C1917",
          muted: "#78716C",
        }
      },
      fontFamily: {
        sans: ["'Noto Sans Devanagari'", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["'Baloo 2'", "var(--font-outfit)", "system-ui", "sans-serif"],
        marathi: ["'Noto Sans Devanagari'", "'Baloo 2'", "sans-serif"],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 20px -2px rgba(180, 83, 9, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 8px 24px -4px rgba(45, 26, 12, 0.07), 0 2px 8px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 16px 36px -6px rgba(180, 83, 9, 0.12), 0 6px 16px -3px rgba(0, 0, 0, 0.05)',
        'story': '0 4px 14px 0 rgba(244, 106, 37, 0.35)',
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
