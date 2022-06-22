/* eslint-disable */
export default {
  displayName: 'schematics',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  setupFiles: ['<rootDir>/.jest/set-env-vars.js'],
  coverageDirectory: '../../coverage/libs/schematics',
};
