const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'rest-dtos',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@trxn/hapify-templates-rest-dtos'],
  importReplacements: {
    models: '@trxn/generated-models',
    mock: '@trxn/generated-rest-dots/mock',
  },
};
