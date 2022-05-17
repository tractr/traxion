const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'nestjs-graphql',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@tractr/hapify-templates-nestjs-graphql'],
  importReplacements: {
    models: '@tractr/generated-models',
    'nestjs-models-common': '@tractr/generated-nestjs-models-common',
  },
};
