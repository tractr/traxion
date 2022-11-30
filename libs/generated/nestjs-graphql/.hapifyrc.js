const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'nestjs-graphql',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@trxn/hapify-templates-nestjs-graphql'],
  importReplacements: {
    models: '@trxn/generated-models',
    'nestjs-models-common': '@trxn/generated-nestjs-models-common',
    casl: '@trxn/generated-casl',
  },
};
