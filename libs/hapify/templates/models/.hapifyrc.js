module.exports = {
  name: 'Hapify templates - models',
  description: 'Generate the models dtos',
  templates: [
    {
      path: 'generated/models/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/models/src/sort-order.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/models/src/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/constants/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/constants/{kebab}-select.constant.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/types/{kebab}.type.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/types/{kebab}-properties.type.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/types/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/enums/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/enums/{kebab}.enum.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/models/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/models/{kebab}.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/models/src/{kebab}/models/{kebab}.dto.ts',
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
