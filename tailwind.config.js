/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false, // Disable Tailwind reset to avoid conflicts with Ant Design
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

