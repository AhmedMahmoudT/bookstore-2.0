/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'intorange': {
          50:  '#fff7ec',
          100: '#ffedd3',
          200: '#ffd8a5',
          300: '#ffbb6d',
          400: '#ff9232',
          500: '#ff730a',
          600: '#ff5900',
          700: '#cc3e02',
          800: '#a1310b',
          900: '#822b0c',
          950: '#461204',
        },
        // ...
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
