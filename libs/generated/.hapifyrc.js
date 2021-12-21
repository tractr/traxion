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
  validatorPath: getValidatorPath(__dirname),
  project: '../../hapify-models.json',
  extends: [
    '../hapify/templates/models',
    '../hapify/templates/rest-dtos',
    '../hapify/templates/casl',
    '../hapify/templates/nestjs-models',
    '../hapify/templates/nestjs-models-common',
    '../hapify/templates/nestjs-models-rest',
    '../hapify/templates/react-admin',
    '../hapify/templates/rext-client',
    '../hapify/templates/angular-rext-client',
  ],
};
