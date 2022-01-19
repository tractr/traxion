const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'angular-rext-client',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['../../../dist/libs/hapify/templates/angular-rext-client'],
  importReplacements: {
    'rext-client': '@tractr/generated-rext-client',
  },
};
