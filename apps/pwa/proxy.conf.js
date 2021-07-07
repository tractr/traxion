const { PORT } = process.env;

module.exports = {
  '/api': {
    target: `http://localhost:${PORT || 3000}`,
    secure: false,
  },
};
