const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/index.{ts,js}',
    '!src/test-setup.ts',
    '!src/**/*.d.ts',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
