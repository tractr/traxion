module.exports = {
  name: 'Hapify templates for Nestjs graphql',
  description: 'Generate the graphql for a Nestjs application',
  project: '../../hapify-models.json',
  templates: [
    {
      path: 'generated/nestjs-graphql/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-graphql/src/nestjs-graphql.module.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-graphql/src/nestjs-models.module.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/nestjs-graphql/src/resolvers/{kebab}.resolver.spec.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-graphql/src/resolvers/{kebab}.resolver.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-graphql/src/dtos/find-many-{kebab}.output.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/nestjs-graphql/src/dtos/index.ts',
      engine: 'hpf',
      input: 'all',
    },
  ],
};
