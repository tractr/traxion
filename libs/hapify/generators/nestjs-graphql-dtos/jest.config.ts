/* eslint-disable */
export default {
  displayName: 'hapify-generators-nestjs-graphql-dtos',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../coverage/libs/hapify/generators/nestjs-graphql-dtos',
};
