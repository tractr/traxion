/* eslint-disable */
export default {
  displayName: 'nestjs-authentication',
  preset: '../../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageDirectory: '../../../coverage/libs/nestjs/authentication',
  modulePathIgnorePatterns: [],
};
