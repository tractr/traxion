const path = require('path');

const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    path.join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [forms],
};
