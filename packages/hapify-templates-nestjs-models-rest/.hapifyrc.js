module.exports = {
  name: 'Hapify templates for Nestjs models',
  description: 'Generate the models for a Nestjs application',
  templates: [
    {
      path: 'src/generated/helpers/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/helpers/format-populate.helper.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/helpers/format-entity-ids.helper.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/{kebab}-rest.constant.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/{kebab}-rest.module.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/controllers/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/controllers/{kebab}.controller.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/services/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/services/{kebab}-rest-dto.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-create-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-find-unique-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-find-unique-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-find-many-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-count-query.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-update-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-update-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-upsert-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-upsert-body.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'src/generated/{kebab}/rest/dtos/{kebab}-delete-params.dto.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-rest-dto.service.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-count-query.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-create-body.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'mock/generated/{kebab}/rest/{kebab}-find-unique-params.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-find-unique-query.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-find-many-query.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-update-params.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-update-body.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-upsert-params.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-upsert-body.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'mock/generated/{kebab}/rest/{kebab}-delete-params.dto.mock.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'test/generated/{kebab}/rest/unit/{kebab}-rest-dto.service.spec.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'test/generated/{kebab}/rest/unit/{kebab}.controller.spec.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'test/generated/{kebab}/rest/e2e/create/{kebab}-create.e2e-spec.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'test/generated/{kebab}/rest/e2e/create/{kebab}-create-validation.e2e-spec.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'test/generated/{kebab}/rest/e2e/find-unique/{kebab}-find-unique.e2e-spec.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path:
        'test/generated/{kebab}/rest/e2e/find-unique/{kebab}-find-unique-validation.e2e-spec.ts',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
