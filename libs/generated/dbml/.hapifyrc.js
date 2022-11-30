const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'dbml',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../../hapify-models.json',
  extends: ['@trxn/hapify-templates-dbml'],
  importReplacements: {},
};
