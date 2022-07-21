const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/index.{ts,js}',
    '!src/test-setup.ts',
  ],
  coverageReporters: ['json', 'text'],
};
