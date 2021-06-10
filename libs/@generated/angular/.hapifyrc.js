const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('../../../dist/libs/config/hapify');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'Angular lib that host all hapify angular modules',
  description: 'A lib that will host all angular file from hapify',
  logo: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png',
  validatorPath: getValidatorPath(process.cwd()),
  project: '../../../hapify-models.json',
  extends: [
    '../../hapify/templates/models',
    '../../hapify/templates/rest-dtos',
    '../../hapify/templates/rext-client',
    '../../hapify/templates/angular-rext-client',
  ],
};
