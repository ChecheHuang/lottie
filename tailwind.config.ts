import type { Config } from 'tailwindcss'
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#f92053',
          secondary: '#afffc1',
          accent: '#0d52e5',
          neutral: '#253341',
          'base-100': '#2d4562',
          info: '#4a85d9',
          success: '#269c6d',
          warning: '#c2690a',
          error: '#ee3a6d',
        },
      },
      'light',
      'dark',
      'cupcake',
    ],
  },
  plugins: [require('daisyui')],
} satisfies Config
export default config
