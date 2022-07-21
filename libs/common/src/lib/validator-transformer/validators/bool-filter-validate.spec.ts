/* eslint-disable max-classes-per-file */
import { validate } from 'class-validator';

import { BoolFilterValidate } from './bool-filter-validate';

describe('BoolFilterValidate decorator', () => {
  // Class to test the BoolFilterValidate decorator
  class BoolFilter {
    @BoolFilterValidate()
    bool!: string | boolean;
  }

  let boolFilter: BoolFilter;

  beforeEach(() => {
    boolFilter = new BoolFilter();
  });

  it('should validate the boolFilter class', async () => {
    boolFilter.bool = 'true';
    let errors = await validate(boolFilter);
    expect(errors.length === 0).toBeTruthy();

    boolFilter.bool = 'false';
    errors = await validate(boolFilter);
    expect(errors.length === 0).toBeTruthy();

    boolFilter.bool = false;
    errors = await validate(boolFilter);
    expect(errors.length === 0).toBeTruthy();

    boolFilter.bool = true;
    errors = await validate(boolFilter);
    expect(errors.length === 0).toBeTruthy();

    boolFilter.bool = 'true:equals';
    errors = await validate(boolFilter);
    expect(errors.length === 0).toBeTruthy();

    boolFilter.bool = 'false:equals';
    errors = await validate(boolFilter);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to change the separator', async () => {
    class BoolFilterWithSeparator {
      @BoolFilterValidate({ separator: ',' })
      bool!: string | boolean;
    }

    const boolFilterWithSeparator = new BoolFilterWithSeparator();

    boolFilterWithSeparator.bool = 'true,equals';
    let errors = await validate(boolFilterWithSeparator);
    expect(errors.length === 0).toBeTruthy();

    boolFilterWithSeparator.bool = 'false,equals';
    errors = await validate(boolFilterWithSeparator);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to validate each', async () => {
    class BoolFilterWithEach {
      @BoolFilterValidate({ each: true })
      bool!: (string | boolean)[] | string;
    }

    const boolFilterWithEach = new BoolFilterWithEach();

    boolFilterWithEach.bool = ['true', 'false', true, false];
    let errors = await validate(boolFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    boolFilterWithEach.bool = 'true,false,true:equals';
    errors = await validate(boolFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    boolFilterWithEach.bool = `${JSON.stringify([
      'true',
      'false',
      true,
      false,
    ])}:equals`;
    errors = await validate(boolFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    boolFilterWithEach.bool = 'true,false,true:has';
    errors = await validate(boolFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    boolFilterWithEach.bool = 'true,false,true:hasSome';
    errors = await validate(boolFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    boolFilterWithEach.bool = 'true,false,true:hasEvery';
    errors = await validate(boolFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    boolFilterWithEach.bool = 'true,false,true:hasSome';
    errors = await validate(boolFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    boolFilterWithEach.bool = 'true,false,true:isEmpty';
    errors = await validate(boolFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    boolFilterWithEach.bool = 'true,false,true:any';
    errors = await validate(boolFilterWithEach);
    expect(errors.length > 0).toBeTruthy();

    boolFilterWithEach.bool = {} as any;
    errors = await validate(boolFilterWithEach);
    expect(errors.length > 0).toBeTruthy();
  });

  it('should fail the validation of the boolFilter class', async () => {
    boolFilter.bool = 'any';
    let errors = await validate(boolFilter);
    expect(errors.length > 0).toBeTruthy();

    boolFilter.bool = 'true:equals:any';
    errors = await validate(boolFilter);
    expect(errors.length > 0).toBeTruthy();

    boolFilter.bool = 'false:equals:any';
    errors = await validate(boolFilter);
    expect(errors.length > 0).toBeTruthy();

    boolFilter.bool = 'false:any';
    errors = await validate(boolFilter);
    expect(errors.length > 0).toBeTruthy();

    boolFilter.bool = 'true:any';
    errors = await validate(boolFilter);
    expect(errors.length > 0).toBeTruthy();

    boolFilter.bool = [] as any;
    errors = await validate(boolFilter);
    expect(errors.length > 0).toBeTruthy();
  });
});
