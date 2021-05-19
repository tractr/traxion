const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

// Hapify configuration
module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'Angular PWA',
  description: 'Angular PWA channel',
  logo: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png',
  validatorPath: getValidatorPath(__dirname),
  project: '../../hapify-models.json',
  extends: [
    '@tractr/hapify-templates-models',
    '@tractr/hapify-templates-rest-dtos',
    '@tractr/hapify-templates-rext-client',
    '@tractr/hapify-templates-angular-rext-client',
  ],
  logo: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png',
  defaultFields: [
    {
      name: 'id',
      type: 'string',
      subtype: null,
      reference: null,
      primary: true,
      unique: false,
      label: false,
      nullable: false,
      multiple: false,
      embedded: false,
      searchable: false,
      sortable: false,
      hidden: false,
      internal: true,
      restricted: false,
      ownership: false,
    },
  ],
  templates: [],
};
