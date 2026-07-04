import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f8f3ea',
        warmBlack: '#1f211a',
        deepGold: '#846733',
        gold: '#a68a4c',
        softGold: '#c7a974',
        sand: '#e6d5b8',
        mist: '#d8d4c9',
        sibylleMist: '#ebe5da',
        white: '#ffffff',
      },
      boxShadow: {
        soft: '0 20px 50px rgba(35,42,26,.08)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
