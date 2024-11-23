/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
      },
      backgroundImage: {
        'hero-pattern': "url('https://drive.google.com/uc?export=view&id=1WQkpjB89a0z4dhubDmjxjWuKCKcKLJhH')",
      },
    },
  },
  plugins: [],
};