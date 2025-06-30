const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        background: '#101414',
        'on-primary-fixed-variant': '#004f4f',
        'on-surface': '#e0e3e2',
        primary: '#00dddd',
      },
    },
  },
  plugins: [],
};
