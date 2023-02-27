/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { validate } from 'class-validator';

import { JsonFilterValidate } from './json-filter-validate';
import { JsonArray, JsonObject } from '../../interfaces';

describe('JsonFilterValidate decorator', () => {
  // Class to test the JsonFilterValidate decorator
  class JsonFilter {
    @JsonFilterValidate()
    json!: string | JsonObject | JsonArray;
  }

  let jsonFilter: JsonFilter;

  beforeEach(() => {
    jsonFilter = new JsonFilter();
  });

  it('should validate the jsonFilter class', async () => {
    let errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = {};
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = [];
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:equals`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:path`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:string_contains`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:string_starts_with`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:string_ends_with`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:array_contains`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:array_starts_with`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:array_ends_with`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:lt`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:lte`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:gt`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:gte`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `{}:not`;
    errors = await validate(jsonFilter);
    expect(errors.length === 0).toBeTruthy();

    jsonFilter.json = `:any`;
    errors = await validate(jsonFilter);
    expect(errors.length > 0).toBeTruthy();

    jsonFilter.json = true as any;
    errors = await validate(jsonFilter);
    expect(errors.length > 0).toBeTruthy();
  });
});
