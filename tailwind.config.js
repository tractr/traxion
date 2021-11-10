module.exports = {
  purge: {
    enabled: true,
    content: ['./apps/pwa/**/*.{html,ts}', './libs/angular/**.*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cali: {
          red: '#FF5E5E',
          orange: '#FF9140',
          dark: '#424B5A',
        },
      },
      spacing: {
        sider: '200px',
      },
      minWidth: {
        'video-preview': '240px',
      },
      maxWidth: {
        'video-preview': '240px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
