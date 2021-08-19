const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'Shared lib that host all hapify shared modules',
  description: 'A lib that will host all shared file from hapify',
  logo: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png',
  validatorPath: getValidatorPath(process.cwd()),
  project: '../../hapify-models.json',
  extends: [
    '@tractr/hapify-templates-casl',
    '@tractr/hapify-templates-models',
    '@tractr/hapify-templates-rest-dtos',
    '@tractr/hapify-templates-nestjs-models',
    '@tractr/hapify-templates-nestjs-models-common',
    '@tractr/hapify-templates-nestjs-models-rest',
    '@tractr/hapify-templates-rext-client',
    '@tractr/hapify-templates-angular-rext-client',
  ],
};
