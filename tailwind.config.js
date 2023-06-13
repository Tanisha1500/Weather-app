/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:
      {
        'custom-blue': 'rgba(71, 191, 223, 1)',
        'custom-white':'rgba(255,255,255,1)',
        'light-blue':'rgba(155, 219, 215, 0.3)',
        
      },
      fontSize:{
        'custom':'69.95px',
        'cloudy':'16.78px',
        'today':'12.59',
      },
    },
  },
  plugins: [],
}

