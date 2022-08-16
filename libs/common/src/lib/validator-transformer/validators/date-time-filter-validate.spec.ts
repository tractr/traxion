/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { validate } from 'class-validator';

import { DateTimeFilterValidate } from './date-time-filter-validate';

describe('DateTimeFilterValidate decorator', () => {
  // Class to test the DateTimeFilterValidate decorator
  class DateTimeFilter {
    @DateTimeFilterValidate()
    datetime!: string | Date;
  }

  let datetimeFilter: DateTimeFilter;

  beforeEach(() => {
    datetimeFilter = new DateTimeFilter();
  });

  it('should validate the datetimeFilter class', async () => {
    let errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilter.datetime = new Date().toISOString();
    errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilter.datetime = new Date();
    errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilter.datetime = `${new Date().toISOString()}:equals`;
    errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilter.datetime = `${new Date().toISOString()}:in`;
    errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilter.datetime = `${new Date().toISOString()}:notIn`;
    errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilter.datetime = `${new Date().toISOString()}:lt`;
    errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilter.datetime = `${new Date().toISOString()}:lte`;
    errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilter.datetime = `${new Date().toISOString()}:gt`;
    errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilter.datetime = `${new Date().toISOString()}:gte`;
    errors = await validate(datetimeFilter);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to change the separator', async () => {
    class DateTimeFilterWithSeparator {
      @DateTimeFilterValidate({ separator: ',' })
      datetime!: string | Date;
    }

    const datetimeFilterWithSeparator = new DateTimeFilterWithSeparator();

    datetimeFilterWithSeparator.datetime = `${new Date().toISOString()},equals`;
    const errors = await validate(datetimeFilterWithSeparator);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to validate each', async () => {
    class DateTimeFilterWithEach {
      @DateTimeFilterValidate({ each: true })
      datetime!: (string | Date)[] | string;
    }

    const datetimeFilterWithEach = new DateTimeFilterWithEach();

    datetimeFilterWithEach.datetime = [new Date().toISOString(), new Date()];
    let errors = await validate(datetimeFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilterWithEach.datetime = `${JSON.stringify([
      new Date().toISOString(),
      new Date(),
    ])}:equals`;
    errors = await validate(datetimeFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilterWithEach.datetime = `${new Date().toISOString()},${new Date().toISOString()}`;
    errors = await validate(datetimeFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilterWithEach.datetime = `${new Date().toISOString()},${new Date().toISOString()}:hasSome`;
    errors = await validate(datetimeFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilterWithEach.datetime = `${new Date().toISOString()},${new Date().toISOString()}:hasEvery`;
    errors = await validate(datetimeFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilterWithEach.datetime = `${new Date().toISOString()},${new Date().toISOString()}:hasSome`;
    errors = await validate(datetimeFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilterWithEach.datetime = `${new Date().toISOString()},${new Date().toISOString()}:isEmpty`;
    errors = await validate(datetimeFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    datetimeFilterWithEach.datetime = `${new Date().toISOString()},${new Date().toISOString()}:any`;
    errors = await validate(datetimeFilterWithEach);
    expect(errors.length > 0).toBeTruthy();

    datetimeFilterWithEach.datetime = {} as any;
    errors = await validate(datetimeFilterWithEach);
    expect(errors.length > 0).toBeTruthy();
  });

  it('should fail the validation of the datetimeFilter class', async () => {
    datetimeFilter.datetime = 'any';
    let errors = await validate(datetimeFilter);
    expect(errors.length > 0).toBeTruthy();

    datetimeFilter.datetime = 'true:equals:any';
    errors = await validate(datetimeFilter);
    expect(errors.length > 0).toBeTruthy();

    datetimeFilter.datetime = 'false:equals:any';
    errors = await validate(datetimeFilter);
    expect(errors.length > 0).toBeTruthy();

    datetimeFilter.datetime = 'false:any';
    errors = await validate(datetimeFilter);
    expect(errors.length > 0).toBeTruthy();

    datetimeFilter.datetime = 'true:any';
    errors = await validate(datetimeFilter);
    expect(errors.length > 0).toBeTruthy();

    datetimeFilter.datetime = [] as any;
    errors = await validate(datetimeFilter);
    expect(errors.length > 0).toBeTruthy();
  });
});
