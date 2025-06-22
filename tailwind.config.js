/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        contrast: 'var(--color-contrast-higher)',
        primary: '#17283D',
      },
      fontFamily: {
        'montreal': ['Neue Montreal', 'sans-serif'],
        'neue-corp': ['NeueCorp', 'sans-serif'],
        'supply-mono': ['PPSupplyMono-Regular', 'monospace'],
      },
      fontSize: {
        'base': 'var(--font-base)',
        'lg': 'var(--text-lg)',
        'md': 'var(--text-md)',
        'xxl': '112px',
      },
      spacing: {
        'd': '2em',
      },
      borderRadius: {
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
