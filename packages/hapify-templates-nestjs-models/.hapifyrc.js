module.exports = {
  name: 'Hapify templates for Nestjs models',
  description: 'Generate the models for a Nestjs application',
  templates: [
    {
      path: 'src/generated/index.ts',
      engine: 'hpf',
      input: 'all',
    },
  ],
};
