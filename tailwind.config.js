/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base:     '#F7F4EF',
        surface1: '#FFFFFF',
        surface2: '#F0EDE8',
        surface3: '#E8E4DC',
        saffron:  '#E8650A',
        ashoka:   '#1A4FBA',
        dark:     '#111118',
        muted:    '#6B6874',
        danger:   '#D93644',
        success:  '#1A7A4A',
        warning:  '#D4830A',
        lime:     '#5FD16A',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
