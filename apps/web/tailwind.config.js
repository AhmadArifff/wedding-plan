/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/invitation-blocks/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FFFDF8',
          DEFAULT: '#FAF8F5',
          warm: '#F5EFEB',
          dark: '#EFE7E0',
        },
        brand: {
          teal: '#0F766E',
          'teal-dark': '#115E59',
          gold: '#D97706',
          'gold-dark': '#B45309',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};
