module.exports = {
  name: 'Hapify templates - models',
  description: 'Generate the models dtos',
  templates: [
    {
      path: 'generated/models/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/models/enums/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/models/enums/sort-order.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/models/enums/{kebab}.enum.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/models/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/models/models/{kebab}.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/mock/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/models/mock/{kebab}.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
