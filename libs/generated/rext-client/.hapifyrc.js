const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'rext-client',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@tractr/hapify-templates-rext-client'],
  importReplacements: {
    models: '@tractr/generated-models',
    'rest-dtos': '@tractr/generated-rest-dtos',
  },
};
