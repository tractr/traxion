module.exports = {
  name: 'Hapify templates for Nestjs models common features',
  description:
    'Generate the common modules and services for models of a Nestjs application',
  project: '../../hapify-models.json',
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
      searchable: true,
      sortable: true,
      hidden: false,
      internal: true,
      restricted: false,
      ownership: false,
    },
  ],
  templates: [
    {
      path: 'generated/nestjs-models-common/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-common/src/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-common/src/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/nestjs-models-common/src/{kebab}/{kebab}-model.module.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/nestjs-models-common/src/{kebab}/{kebab}-model.constant.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-common/src/{kebab}/services/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/nestjs-models-common/src/{kebab}/services/{kebab}-database.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/nestjs-models-common/src/{kebab}/services/{kebab}.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-common/mock/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-common/mock/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-common/mock/{kebab}/{kebab}.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-common/mock/{kebab}/{kebab}.seed.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/nestjs-models-common/mock/{kebab}/{kebab}-database.service.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/nestjs-models-common/mock/{kebab}/{kebab}.service.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/nestjs-models-common/test/{kebab}/{kebab}.service.spec.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/nestjs-models-common/test/{kebab}-database.service.spec.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
