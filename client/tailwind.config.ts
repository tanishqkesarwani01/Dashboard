import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        garamond: ["'Garamond'", "'Times New Roman'", 'serif'],
        geist: ["'Geist'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ["'Geist'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        'nav-mobile': '0.25em',
        'nav-desktop': '0.3em',
        'nav-link': '0.2em',
        'cta-mobile': '0.18em',
        'cta-desktop': '0.2em',
      },
    },
  },
  plugins: [],
};

export default config;
