const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'nestjs-models',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@tractr/hapify-templates-nestjs-models'],
  importReplacements: {
    'nestjs-models-common': '@tractr/generated-nestjs-models-common',
    'nestjs-models-rest': '@tractr/generated-nestjs-models-rest',
  },
};
