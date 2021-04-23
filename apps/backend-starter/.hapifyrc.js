const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'NestJS Backend starter',
  description: 'A backend starter to get a nestjs server squeleton',
  logo: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png',
  validatorPath: getValidatorPath(__dirname),
  project: '../../hapify-models.json',
  extends: [
    '@tractr/hapify-templates-prisma',
    '@tractr/hapify-templates-models',
    '@tractr/hapify-templates-rest-dtos',
    '@tractr/hapify-templates-nestjs-models-common',
    '@tractr/hapify-templates-nestjs-models-rest',
    '@tractr/hapify-templates-nestjs-models',
  ],
};
