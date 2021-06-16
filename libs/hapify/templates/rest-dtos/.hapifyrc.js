module.exports = {
  name: 'Hapify templates for Nestjs models',
  description: 'Generate the models for a Nestjs application',
  templates: [
    {
      path: 'generated/rest-dtos/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rest-dtos/dtos/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/{kebab}-create-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/{kebab}-find-unique-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/rest-dtos/dtos/{kebab}/{kebab}-find-unique-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/{kebab}-find-many-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/{kebab}-count-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/{kebab}-update-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/{kebab}-update-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/{kebab}-upsert-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/{kebab}-upsert-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/dtos/{kebab}/{kebab}-delete-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/mock/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rest-dtos/mock/{kebab}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/mock/{kebab}/{kebab}-count-query.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/mock/{kebab}/{kebab}-create-body.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/rest-dtos/mock/{kebab}/{kebab}-find-unique-params.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/rest-dtos/mock/{kebab}/{kebab}-find-unique-query.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/rest-dtos/mock/{kebab}/{kebab}-find-many-query.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/rest-dtos/mock/{kebab}/{kebab}-update-params.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/mock/{kebab}/{kebab}-update-body.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/rest-dtos/mock/{kebab}/{kebab}-upsert-params.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rest-dtos/mock/{kebab}/{kebab}-upsert-body.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'generated/rest-dtos/mock/{kebab}/{kebab}-delete-params.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
