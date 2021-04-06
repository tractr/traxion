module.exports = {
  name: 'Hapify templates for Nestjs models',
  description: 'Generate the models for a Nestjs application',
  templates: [
    {
      path: 'generated/dtos/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/dtos/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-create-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-find-unique-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-find-unique-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-find-many-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-count-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-update-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-update-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-upsert-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-upsert-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/dtos/{kebab}/{kebab}-delete-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
