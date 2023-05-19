/* eslint-disable */
export default {
  displayName: 'hapify-prisma-nestjs-graphql-dtos-generator',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../coverage/libs/hapify/prisma/nestjs-graphql-dtos-generator',
};
