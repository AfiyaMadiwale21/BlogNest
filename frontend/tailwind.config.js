/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cardo: ['Cardo', 'serif'],
        merienda: ['Merienda', 'cursive'],
        coiny: ['Coiny', 'cursive'],
      },
    },
    plugins: [],
  },
}