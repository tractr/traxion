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
      path: 'src/generated/{kebab}/common/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/{kebab}-model.module.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/{kebab}-model.constant.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/services/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/services/{kebab}-database.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/common/services/{kebab}.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/common/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/common/{kebab}.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/common/{kebab}.seed.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/common/{kebab}-database.service.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/common/{kebab}.service.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'test/generated/{kebab}/common/unit/{kebab}.service.spec.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'test/generated/{kebab}/common/unit/{kebab}-database.service.spec.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
