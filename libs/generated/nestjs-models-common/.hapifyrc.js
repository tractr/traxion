const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'nestjs-models-common',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@tractr/hapify-templates-nestjs-models-common'],
  importReplacements: {
    models: '@tractr/generated-models',
    mock: '@tractr/generated-nestjs-models-common/mock',
  },
};
