const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'nestjs-models-rest',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@tractr/hapify-templates-nestjs-models-rest'],
  importReplacements: {
    casl: '@tractr/generated-casl',
    'nestjs-models-common': '@tractr/generated-nestjs-models-common',
    'rest-dtos': '@tractr/generated-rest-dtos',
    models: '@tractr/generated-models',
    mock: '@tractr/generated-nestjs-models-rest/mock',
  },
};
