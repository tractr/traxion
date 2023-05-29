/* eslint-disable */
export default {
  displayName: 'hapify-prisma-nestjs-graphql-resolvers-generator',
  preset: '../../../../jest.preset.js',
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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../coverage/libs/hapify/prisma/nestjs-graphql-resolvers-generator',
};
