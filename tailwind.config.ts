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
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
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
          bg: "#FAF8F5",
          card: "#FFFFFF",
          border: "#EFE8DE",
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
        'soft': '0 4px 20px -2px rgba(124, 45, 18, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 6px 24px -4px rgba(40, 25, 10, 0.07), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 36px -6px rgba(124, 45, 18, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
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
