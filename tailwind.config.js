/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae2fd',
          300: '#7cc8fc',
          400: '#38abfa',
          500: '#0e90eb',
          600: '#0273ca',
          700: '#035ca3',
          800: '#074f87',
          900: '#0c4270',
          950: '#081a2f', // Trustworthy deep blue
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981', // Glowing Green / WhatsApp Green
          600: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
