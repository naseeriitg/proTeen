/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink:    '#1A1814',
        paper:  '#F6F2EA',
        stone:  '#E2DDD5',
        dust:   '#C8C2B8',
        gold:   '#8A6820',
        sage:   '#3D5238',
        warm:   '#B87840',
        cream:  '#EDE9DF',
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
    },
  },
  plugins: [],
}
