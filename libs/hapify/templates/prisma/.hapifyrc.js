module.exports = {
  name: 'Hapify prisma templates',
  description: 'Generate the model.prisma in the prisma folder',
  templates: [
    {
      path: 'prisma/schemas/generated.prisma',
      engine: 'hpf',
      input: 'all',
    },
  ],
};
