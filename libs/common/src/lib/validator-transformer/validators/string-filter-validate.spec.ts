/* eslint-disable max-classes-per-file */
import { validate } from 'class-validator';

import { StringFilterValidate } from './string-filter-validate';

describe('StringFilterValidate decorator', () => {
  // Class to test the StringFilterValidate decorator
  class StringFilter {
    @StringFilterValidate()
    string!: string;
  }

  let stringFilter: StringFilter;

  beforeEach(() => {
    stringFilter = new StringFilter();
  });

  it('should validate the stringFilter class', async () => {
    let errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = 'foo';
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:equals`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:in`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:notIn`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:lt`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:lte`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:gt`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:gte`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:contains`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:startsWith`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();

    stringFilter.string = `foo:endsWith`;
    errors = await validate(stringFilter);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to change the separator', async () => {
    class StringFilterWithSeparator {
      @StringFilterValidate({ separator: ',' })
      string!: string;
    }

    const stringFilterWithSeparator = new StringFilterWithSeparator();

    stringFilterWithSeparator.string = `foo,equals`;
    const errors = await validate(stringFilterWithSeparator);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to validate each', async () => {
    class StringFilterWithEach {
      @StringFilterValidate({ each: true })
      string!: string[] | string;
    }

    const stringFilterWithEach = new StringFilterWithEach();

    stringFilterWithEach.string = ['foo', 'bar'];
    let errors = await validate(stringFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    stringFilterWithEach.string = `${JSON.stringify(['foo', 'bar'])}:equals`;
    errors = await validate(stringFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    stringFilterWithEach.string = `foo,foo`;
    errors = await validate(stringFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    stringFilterWithEach.string = `foo,foo:hasSome`;
    errors = await validate(stringFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    stringFilterWithEach.string = `foo,foo:hasEvery`;
    errors = await validate(stringFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    stringFilterWithEach.string = `foo,foo:hasSome`;
    errors = await validate(stringFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    stringFilterWithEach.string = `foo,foo:isEmpty`;
    errors = await validate(stringFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    stringFilterWithEach.string = `foo,foo:any`;
    errors = await validate(stringFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    stringFilterWithEach.string = {} as any;
    errors = await validate(stringFilterWithEach);
    expect(errors.length > 0).toBeTruthy();
  });
});
