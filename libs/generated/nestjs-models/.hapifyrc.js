const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'nestjs-models',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@trxn/hapify-templates-nestjs-models'],
  importReplacements: {
    'nestjs-models-common': '@trxn/generated-nestjs-models-common',
    'nestjs-models-rest': '@trxn/generated-nestjs-models-rest',
  },
};
