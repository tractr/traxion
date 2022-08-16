/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { validate } from 'class-validator';

import { EnumFilterValidate } from './enum-filter-validate';

describe('EnumFilterValidate decorator', () => {
  enum TestEnum {
    A = 'A',
    B = 'B',
    C = 'C',
  }
  const testEnum = ['A', 'B', 'C'];
  // Class to test the EnumFilterValidate decorator
  class EnumFilter {
    @EnumFilterValidate(testEnum)
    enum!: string;
  }

  let enumFilter: EnumFilter;

  beforeEach(() => {
    enumFilter = new EnumFilter();
  });

  it('should validate the enumFilter class', async () => {
    let errors = await validate(enumFilter);
    expect(errors.length === 0).toBeTruthy();

    enumFilter.enum = TestEnum.A;
    errors = await validate(enumFilter);
    expect(errors.length === 0).toBeTruthy();

    enumFilter.enum = TestEnum.B;
    errors = await validate(enumFilter);
    expect(errors.length === 0).toBeTruthy();

    enumFilter.enum = TestEnum.C;
    errors = await validate(enumFilter);
    expect(errors.length === 0).toBeTruthy();

    enumFilter.enum = `${TestEnum.A}:equals`;
    errors = await validate(enumFilter);
    expect(errors.length === 0).toBeTruthy();

    enumFilter.enum = `${TestEnum.A}:in`;
    errors = await validate(enumFilter);
    expect(errors.length === 0).toBeTruthy();

    enumFilter.enum = `${TestEnum.A}:notIn`;
    errors = await validate(enumFilter);
    expect(errors.length === 0).toBeTruthy();

    enumFilter.enum = `${TestEnum.A}:not`;
    errors = await validate(enumFilter);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to change the separator', async () => {
    class EnumFilterWithSeparator {
      @EnumFilterValidate(testEnum, { separator: ',' })
      enum!: string;
    }

    const enumFilterWithSeparator = new EnumFilterWithSeparator();

    enumFilterWithSeparator.enum = `${TestEnum.A},equals`;
    const errors = await validate(enumFilterWithSeparator);
    expect(errors.length === 0).toBeTruthy();
  });

  it('should be able to validate each', async () => {
    class EnumFilterWithEach {
      @EnumFilterValidate(testEnum, { each: true })
      enum!: string[] | string;
    }

    const enumFilterWithEach = new EnumFilterWithEach();

    enumFilterWithEach.enum = [TestEnum.A, TestEnum.B];
    let errors = await validate(enumFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    enumFilterWithEach.enum = `${JSON.stringify([
      TestEnum.A,
      TestEnum.B,
    ])}:equals`;
    errors = await validate(enumFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    enumFilterWithEach.enum = `${TestEnum.A},${TestEnum.B}`;
    errors = await validate(enumFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    enumFilterWithEach.enum = `${TestEnum.A},${TestEnum.B}:hasSome`;
    errors = await validate(enumFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    enumFilterWithEach.enum = `${TestEnum.A},${TestEnum.B}:hasEvery`;
    errors = await validate(enumFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    enumFilterWithEach.enum = `${TestEnum.A},${TestEnum.B}:hasSome`;
    errors = await validate(enumFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    enumFilterWithEach.enum = `${TestEnum.A},${TestEnum.B}:isEmpty`;
    errors = await validate(enumFilterWithEach);
    expect(errors.length === 0).toBeTruthy();

    enumFilterWithEach.enum = `${TestEnum.A},${TestEnum.B}:any`;
    errors = await validate(enumFilterWithEach);
    expect(errors.length > 0).toBeTruthy();

    enumFilterWithEach.enum = {} as any;
    errors = await validate(enumFilterWithEach);
    expect(errors.length > 0).toBeTruthy();
  });
});
