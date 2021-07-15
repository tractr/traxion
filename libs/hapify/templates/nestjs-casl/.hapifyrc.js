module.exports = {
  name: 'Hapify templates - models',
  description: 'Generate the models dtos',
  templates: [
    {
      path: 'generated/nestjs-casl/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-casl/src/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-casl/src/services/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-casl/src/services/casl-ability-factory.service.ts',
      engine: 'hpf',
      input: 'all',
    },
  ],
};
