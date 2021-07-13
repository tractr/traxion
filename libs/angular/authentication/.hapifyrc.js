const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('../../../dist/libs/config/hapify/src');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'Shared lib that host all hapify shared modules',
  description: 'A lib that will host all shared file from hapify',
  logo: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png',
  validatorPath: getValidatorPath(process.cwd()),
  project: '../../nestjs/authentication/hapify-plugin-user-model.json',
  extends: ['../../hapify/templates/models'],
};
