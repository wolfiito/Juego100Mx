/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            display: ['"Bebas Neue"', 'sans-serif'],
        },
      },
    },
    plugins: [
      require('daisyui'),
    ],
    daisyui: {
      themes: ["night", "synthwave"],
      darkTheme: "night",
    },
  }