const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  validatorPath: getValidatorPath(process.cwd()),
  project: '../../../hapify-models.json',
  extends: ['@tractr/hapify-templates-nestjs-models-rest'],
  importReplacements: {
    models: '@cali/common-models',
    'rest-dtos': '@cali/common-rest-dtos',
    'nestjs-models-common': '@cali/nestjs-common',
    casl: '@cali/common-casl',
  },
};
