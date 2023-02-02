module.exports = {
  name: 'Hapify templates for Nestjs models',
  description: 'Generate the models for a Nestjs application',
  templates: [
    {
      path: 'generated/nestjs-models-rest/index.spec.ts',
      engine: 'hpf',
      input: 'all',
    },
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
      path: 'generated/nestjs-models-rest/src/models-rest.controllers.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-rest/src/models-rest.module-definition.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-rest/src/models-rest.module.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-rest/src/models-rest.providers.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-rest/src/interfaces/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-rest/src/interfaces/models-rest.interface.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/{kebab}-rest.controllers.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/{kebab}-rest.providers.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/{kebab}-rest.constants.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/controllers/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-models-rest/src/{kebab}/controllers/{kebab}.controller.spec.ts',
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
