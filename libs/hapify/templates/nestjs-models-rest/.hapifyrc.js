module.exports = {
  name: 'Hapify templates for Nestjs models',
  description: 'Generate the models for a Nestjs application',
  templates: [
    {
      path: 'generated/nestjs-models-rest/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-rest/src/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/{kebab}-rest.constant.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/controllers/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/controllers/{kebab}.controller.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/services/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/services/{kebab}-rest-dto.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/mock/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-rest/mock/{kebab}-rest-dto.service.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
