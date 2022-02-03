const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'rest-dtos',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@tractr/hapify-templates-rest-dtos'],
  importReplacements: {
    models: '@tractr/generated-models',
    mock: '@tractr/generated-rest-dots/mock',
  },
};
