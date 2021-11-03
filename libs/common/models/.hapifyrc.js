const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  validatorPath: getValidatorPath(process.cwd()),
  project: '../../../hapify-models.json',
  extends: ['@tractr/hapify-templates-models'],
  importReplacements: {},
};
