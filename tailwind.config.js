module.exports = {
  purge: {
    enabled: true,
    content: ['./apps/pwa/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cali: {
          red: '#FF5E5E',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
