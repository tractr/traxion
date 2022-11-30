const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'nestjs-models-common',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@trxn/hapify-templates-nestjs-models-common'],
  importReplacements: {
    models: '@trxn/generated-models',
    mock: '@trxn/generated-nestjs-models-common/mock',
  },
};
