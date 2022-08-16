/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { validate } from 'class-validator';

import { NumberFilterValidate } from './number-filter-validate';

describe('NumberFilterValidate decorator', () => {
  // Class to test the NumberFilterValidate decorator
  class NumberFilter {
    @NumberFilterValidate()
    number!: string | number;
  }

  let numberFilter: NumberFilter;

  beforeEach(() => {
    numberFilter = new NumberFilter();
  });

  it('should validate the numberFilter class', async () => {
    let errors = await validate(numberFilter);
    expect(errors.length === 0).toBeTruthy();

    numberFilter.number = '1';
    errors = await validate(numberFilter);
    expect(errors.length === 0).toBeTruthy();

    numberFilter.number = 2;
    errors = await validate(numberFilter);
    expect(errors.length === 0).toBeTruthy();

    numberFilter.number = `1:equals`;
    errors = await validate(numberFilter);
    expect(errors.length === 0).toBeTruthy();

    numberFilter.number = `1:lt`;
    errors = await validate(numberFilter);
    expect(errors.length === 0).toBeTruthy();

    numberFilter.number = `1:lte`;
    errors = await validate(numberFilter);
    expect(errors.length === 0).toBeTruthy();

    numberFilter.number = `1:gt`;
    errors = await validate(numberFilter);
    expect(errors.length === 0).toBeTruthy();

    numberFilter.number = `1:gte`;
    errors = await validate(numberFilter);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to change the separator', async () => {
    class NumberFilterWithSeparator {
      @NumberFilterValidate({ separator: ',' })
      number!: string | number;
    }

    const numberFilterWithSeparator = new NumberFilterWithSeparator();

    numberFilterWithSeparator.number = `1,equals`;
    const errors = await validate(numberFilterWithSeparator);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to validate each', async () => {
    class NumberFilterWithEach {
      @NumberFilterValidate({ each: true })
      number!: (string | number)[] | string;
    }

    const numberFilterWithEach = new NumberFilterWithEach();

    numberFilterWithEach.number = ['1', 2];
    let errors = await validate(numberFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    numberFilterWithEach.number = `${JSON.stringify(['1', 2])}:equals`;
    errors = await validate(numberFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    numberFilterWithEach.number = `1,1`;
    errors = await validate(numberFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    numberFilterWithEach.number = `1,1:hasSome`;
    errors = await validate(numberFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    numberFilterWithEach.number = `1,1:hasEvery`;
    errors = await validate(numberFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    numberFilterWithEach.number = `1,1:hasSome`;
    errors = await validate(numberFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    numberFilterWithEach.number = `1,1:isEmpty`;
    errors = await validate(numberFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    numberFilterWithEach.number = `1,1:any`;
    errors = await validate(numberFilterWithEach);
    expect(errors.length > 0).toBeTruthy();

    numberFilterWithEach.number = {} as any;
    errors = await validate(numberFilterWithEach);
    expect(errors.length > 0).toBeTruthy();
  });
});
