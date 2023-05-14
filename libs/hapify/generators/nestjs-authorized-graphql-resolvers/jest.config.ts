/* eslint-disable */
export default {
  displayName: 'hapify-generators-nestjs-authorized-graphql-resolvers',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../coverage/libs/hapify/generators/nestjs-authorized-graphql-resolvers',
};
