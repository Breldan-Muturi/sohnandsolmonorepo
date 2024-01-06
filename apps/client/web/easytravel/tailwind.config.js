/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',

    '../../../../libs/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        opensans: 'var(--font-opensans)',
        caveat: 'var(--font-caveat)',
      },
    },
  },
  presets: [require('../../../../tailwind-workspace-preset.js')],
};
