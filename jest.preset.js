const nxPreset = require('@nrwl/jest/preset');

module.exports = { ...nxPreset, collectCoverageFrom: ['src/**/*.{ts,js}'] };
