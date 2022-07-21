import {
  ArrayFilterProps,
  BoolFilterProps,
  DateTimeFilterProps,
  EnumFilterProps,
  JsonFilterProps,
  NumberFilterProps,
  StringFilterProps,
} from './filter-props.constant';

describe('Filter props', () => {
  it('ArrayFilterProps should be array of strings', () => {
    expect(ArrayFilterProps).toEqual(
      expect.arrayContaining([
        'equals',
        'has',
        'hasEvery',
        'hasSome',
        'isEmpty',
      ]),
    );
  });

  it('BoolFilterProps should be array of strings', () => {
    expect(BoolFilterProps).toEqual(expect.arrayContaining(['equals']));
  });
  it('DateTimeFilterProps should be array of strings', () => {
    expect(DateTimeFilterProps).toEqual(
      expect.arrayContaining([
        'equals',
        'in',
        'notIn',
        'lt',
        'lte',
        'gt',
        'gte',
      ]),
    );
  });
  it('EnumFilterProps should be array of strings', () => {
    expect(EnumFilterProps).toEqual(
      expect.arrayContaining(['equals', 'in', 'notIn', 'not']),
    );
  });
  it('JsonFilterProps should be array of strings', () => {
    expect(JsonFilterProps).toEqual(
      expect.arrayContaining([
        'equals',
        'path',
        'string_contains',
        'string_starts_with',
        'string_ends_with',
        'array_contains',
        'array_starts_with',
        'array_ends_with',
        'lt',
        'lte',
        'gt',
        'gte',
        'not',
      ]),
    );
  });
  it('NumberFilterProps should be array of strings', () => {
    expect(NumberFilterProps).toEqual(
      expect.arrayContaining(['equals', 'lt', 'lte', 'gt', 'gte']),
    );
  });
  it('StringFilterProps should be array of strings', () => {
    expect(StringFilterProps).toEqual(
      expect.arrayContaining([
        'equals',
        'in',
        'notIn',
        'lt',
        'lte',
        'gt',
        'gte',
        'contains',
        'startsWith',
        'endsWith',
      ]),
    );
  });
});
