module.exports = {
  darkMode: false,
  purge: {
    enabled: true,
    content: ['./apps/pwa/**/*.{html,ts}', './libs/angular/**.*.{html,ts}'],
  },
  theme: {
    extend: {
      borderRadius: {
        none: '0',
        sm: '.125rem',
        DEFAULT: '.25rem',
        lg: '.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
