module.exports = {
  name: 'Hapify prisma boilerplate',
  description: 'Generate the model.prisma in the prisma folder',
  templates: [
    {
      path: 'prisma/schemas/generated.prisma',
      engine: 'hpf',
      input: 'all',
    },
  ],
};
