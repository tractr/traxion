const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'Prima hapify generation',
  description: 'A lib that will generate all the prisma files',
  logo: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png',
  validatorPath: getValidatorPath(process.cwd()),
  project: '../../hapify-models.json',
  extends: ['@tractr/hapify-templates-prisma'],
};
