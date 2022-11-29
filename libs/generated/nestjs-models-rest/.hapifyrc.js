const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'nestjs-models-rest',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@trxn/hapify-templates-nestjs-models-rest'],
  importReplacements: {
    casl: '@trxn/generated-casl',
    'nestjs-models-common': '@trxn/generated-nestjs-models-common',
    'rest-dtos': '@trxn/generated-rest-dtos',
    models: '@trxn/generated-models',
    mock: '@trxn/generated-nestjs-models-rest/mock',
  },
};
