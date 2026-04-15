/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false, // Disable Tailwind reset to avoid conflicts with Ant Design
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

