import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#F4FBFC',  // Primary light background
          100: '#EAF7FA', // Secondary soft background
          200: '#C7EEF5',
          300: '#8AE0F0',
          400: '#22D3EE', // Bright Aqua
          500: '#06B6D4', // Accent Cyan
          600: '#087EA4', // Ocean Blue
          700: '#075985', // Deep Ocean Blue
          800: '#123044', // Dark Navy Text
          900: '#0A1E2C', // Deepest Text
          950: '#05111A',
        },
        slateText: {
          primary: '#123044',
          secondary: '#5F7F8C',
          muted: '#8AA0AC',
        },
        tealAccent: {
          500: '#0D9488',
          600: '#0F766E',
        },
        emeraldAccent: {
          500: '#10B981',
        },
        amberAccent: {
          500: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 12px 40px rgba(20, 100, 120, 0.08)',
        'glass-hover': '0 16px 48px rgba(20, 100, 120, 0.14)',
      }
    },
  },
  plugins: [],
};

export default config;
