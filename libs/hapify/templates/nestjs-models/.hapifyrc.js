module.exports = {
  name: 'Hapify templates for Nestjs models',
  description: 'Generate the models for a Nestjs application',
  project: '../../hapify-models.json',
  templates: [
    {
      path: 'generated/nestjs-models/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models/src/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models/src/models.module.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models/src/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models/src/{kebab}/{kebab}.module.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models/src/{kebab}/{kebab}-model.module.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models/src/{kebab}/{kebab}-middleware.module.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models/src/{kebab}/{kebab}-rest.module.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
