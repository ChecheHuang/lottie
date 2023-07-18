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
          primary: 'hsl(164,32%,60%)',
          secondary: 'hsl(37,80%,84%)',
          neutral: 'hsl(355,57%,64%)',
          'base-100': 'white',
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
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
} satisfies Config
export default config
