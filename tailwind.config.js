/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // HSL-based colors to match globals.css
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        primary: 'hsl(var(--primary))',
        'primary-dark': 'hsl(var(--primary-dark))',
        'primary-light': 'hsl(var(--primary-light))',
        secondary: 'hsl(var(--secondary))',
        'secondary-light': 'hsl(var(--secondary-light))',
        'secondary-dark': 'hsl(var(--secondary-dark))',
        accent: 'hsl(var(--accent))',
        'accent-light': 'hsl(var(--accent-light))',
        'accent-dark': 'hsl(var(--accent-dark))',
        muted: 'hsl(var(--muted))',
        'neutral-200': '#e5e5e5',
        'neutral-300': '#d4d4d4',
        'neutral-400': '#a3a3a3',
        'neutral-600': '#525252',
        'neutral-700': '#404040',
        'neutral-900': '#171717',
      },
      fontFamily: {
        sans: [
          'var(--font-noto-sans)',
          'var(--font-noto-sans-tc)',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(to bottom right, var(--soft-black), var(--cultural-red) 120%)',
      },
    },
  },
  plugins: [],
}
