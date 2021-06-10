const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('../../../dist/libs/config/hapify');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'New bootstrap',
  description: 'A new Hapify channel',
  logo: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png',
  validatorPath: getValidatorPath(__dirname),
  project: './hapify-plugin-model-user.json',
  extends: [
    '../../hapify/templates/models',
    '../../hapify/templates/nestjs-models-common',
  ],
};
