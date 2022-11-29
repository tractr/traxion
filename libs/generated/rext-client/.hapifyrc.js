const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'rext-client',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@trxn/hapify-templates-rext-client'],
  importReplacements: {
    models: '@trxn/generated-models',
    'rest-dtos': '@trxn/generated-rest-dtos',
  },
};
