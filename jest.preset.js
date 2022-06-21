const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
