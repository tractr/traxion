import { formatFilterType } from './format-filter-type';

import {
  ArrayFilterProps,
  EnumFilterProps,
  NumberFilterProps,
  StringFilterProps,
} from '@trxn/common';

describe('formatFilterType', () => {
  describe('Format filter for data of type array', () => {
    it('should format string', () => {
      const filter = 'string,string';

      const result = formatFilterType(filter, 'string', true);

      expect(result).toEqual({
        equals: filter.split(','),
      });
    });

    it('should format boolean', () => {
      const filter = 'true,false';

      const result = formatFilterType(filter, 'boolean', true);

      expect(result).toEqual({
        equals: [true, false],
      });
    });

    it('should format number', () => {
      const filter = '1,2';

      const result = formatFilterType(filter, 'number', true);

      expect(result).toEqual({
        equals: [1, 2],
      });
    });

    // TODO: add tests for datetime and JSON format

    it('should use "equals" operator if no operator is specified', () => {
      const filter = 'string,string';

      const result = formatFilterType(filter, 'string', true);

      expect(result).toEqual({
        equals: filter.split(','),
      });
    });

    it('should format filter with "equals" operator properly', () => {
      const filterValue = 'string,string';
      const filterOperator: ArrayFilterProps = 'equals';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', true);

      expect(result).toEqual({
        [filterOperator]: filterValue.split(','),
      });
    });

    it('should format filter with "has" operator properly', () => {
      const filterValue = 'string,string';
      const filterOperator: ArrayFilterProps = 'has';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', true);

      expect(result).toEqual({
        [filterOperator]: filterValue.split(','),
      });
    });

    it('should format filter with "hasSome" operator properly', () => {
      const filterValue = 'string,string';
      const filterOperator: ArrayFilterProps = 'hasSome';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', true);

      expect(result).toEqual({
        [filterOperator]: filterValue.split(','),
      });
    });

    it('should format filter with "hasEvery" operator properly', () => {
      const filterValue = 'string,string';
      const filterOperator: ArrayFilterProps = 'hasEvery';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', true);

      expect(result).toEqual({
        [filterOperator]: filterValue.split(','),
      });
    });

    it('should format filter with "isEmpty" operator properly', () => {
      const filterValue = 'string,string';
      const filterOperator: ArrayFilterProps = 'isEmpty';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', true);

      expect(result).toEqual({
        [filterOperator]: filterValue.split(','),
      });
    });
  });

  describe('Format filter for data of type string', () => {
    it('should use "equals" operator if no operator is specified', () => {
      const filter = 'string';

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        equals: filter,
      });
    });

    it('should format filter with "equals" operator properly', () => {
      const filterValue = 'string';
      const filterOperator: StringFilterProps = 'equals';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });

    it('should format filter with "in" operator properly', () => {
      const filterValue = 'string1,string2';
      const filterOperator: StringFilterProps = 'in';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue.split(','),
      });
    });

    it('should format filter with "notIn" operator properly', () => {
      const filterValue = 'string1,string2';
      const filterOperator: StringFilterProps = 'notIn';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue.split(','),
      });
    });

    it('should format filter with "lt" operator properly', () => {
      const filterValue = 'string';
      const filterOperator: StringFilterProps = 'lt';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });

    it('should format filter with "lte" operator properly', () => {
      const filterValue = 'string';
      const filterOperator: StringFilterProps = 'lte';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });

    it('should format filter with "gt" operator properly', () => {
      const filterValue = 'string';
      const filterOperator: StringFilterProps = 'gt';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });

    it('should format filter with "gte" operator properly', () => {
      const filterValue = 'string';
      const filterOperator: StringFilterProps = 'gte';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });

    it('should format filter with "contains" operator properly', () => {
      const filterValue = 'string';
      const filterOperator: StringFilterProps = 'contains';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });

    it('should format filter with "startsWith" operator properly', () => {
      const filterValue = 'string';
      const filterOperator: StringFilterProps = 'startsWith';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });

    it('should format filter with "endsWith" operator properly', () => {
      const filterValue = 'string';
      const filterOperator: StringFilterProps = 'endsWith';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'string', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });
  });

  describe('Format filter for data of type enum', () => {
    it('should use "equals" operator if no operator is specified', () => {
      const filter = 'enum';

      const result = formatFilterType(filter, 'enum', false);

      expect(result).toEqual({
        equals: filter,
      });
    });

    it('should format filter with "equals" operator properly', () => {
      const filterValue = 'enum';
      const filterOperator: EnumFilterProps = 'equals';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'enum', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });

    it('should format filter with "in" operator properly', () => {
      const filterValue = 'enum,enum';
      const filterOperator: EnumFilterProps = 'in';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'enum', false);

      expect(result).toEqual({
        [filterOperator]: filterValue.split(','),
      });
    });

    it('should format filter with "notIn" operator properly', () => {
      const filterValue = 'enum,enum';
      const filterOperator: EnumFilterProps = 'notIn';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'enum', false);

      expect(result).toEqual({
        [filterOperator]: filterValue.split(','),
      });
    });

    it('should format filter with "not" operator properly', () => {
      const filterValue = 'enum';
      const filterOperator: EnumFilterProps = 'not';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'enum', false);

      expect(result).toEqual({
        [filterOperator]: filterValue,
      });
    });
  });

  describe('Format filter for data of type number', () => {
    it('should use "equals" operator if no operator is specified', () => {
      const filter = '1';

      const result = formatFilterType(filter, 'number', false);

      expect(result).toEqual({
        equals: 1,
      });
    });

    it('should format filter with "equals" operator properly', () => {
      const filterValue = '1';
      const filterOperator: EnumFilterProps = 'equals';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'number', false);

      expect(result).toEqual({
        [filterOperator]: 1,
      });
    });

    it('should format filter with "lt" operator properly', () => {
      const filterValue = '1';
      const filterOperator: NumberFilterProps = 'lt';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'number', false);

      expect(result).toEqual({
        [filterOperator]: 1,
      });
    });

    it('should format filter with "lte" operator properly', () => {
      const filterValue = '1';
      const filterOperator: NumberFilterProps = 'lte';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'number', false);

      expect(result).toEqual({
        [filterOperator]: 1,
      });
    });

    it('should format filter with "gt" operator properly', () => {
      const filterValue = '1';
      const filterOperator: NumberFilterProps = 'gt';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'number', false);

      expect(result).toEqual({
        [filterOperator]: 1,
      });
    });

    it('should format filter with "gte" operator properly', () => {
      const filterValue = '1';
      const filterOperator: NumberFilterProps = 'gte';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'number', false);

      expect(result).toEqual({
        [filterOperator]: 1,
      });
    });
  });

  describe('Format filter for data of type boolean', () => {
    it('should use "equals" operator if no operator is specified', () => {
      const filter = 'true';

      const result = formatFilterType(filter, 'boolean', false);

      expect(result).toEqual({
        equals: true,
      });
    });

    it('should format filter with "equals" operator properly', () => {
      const filterValue = 'true';
      const filterOperator: StringFilterProps = 'equals';
      const filter = `${filterValue}:${filterOperator}`;

      const result = formatFilterType(filter, 'boolean', false);

      expect(result).toEqual({
        [filterOperator]: true,
      });
    });
  });

  // TODO add tests for JSON format

  // TODO add tests for datetime format

  // describe('Format filter for data of type date', () => {
  //   it('should use "equals" operator if no operator is specified', () => {
  //     const filter = '2011-10-05T14:48:00.000Z';

  //     const result = formatFilterType(filter, 'datetime', false);

  //     expect(result).toEqual({
  //       equals: new Date(filter),
  //     });
  //   });

  //   it('should format filter with "equals" operator properly', () => {
  //     const filterValue = '2011-10-05T14:48:00.000Z';
  //     const filterOperator: DateTimeFilterProps = 'equals';
  //     const filter = `${filterValue}:${filterOperator}`;

  //     const result = formatFilterType(filter, 'datetime', false);

  //     expect(result).toEqual({
  //       [filterOperator]: new Date(filterValue),
  //     });
  //   });

  //   it('should format filter with "in" operator properly', () => {
  //     const filterValue = 'Fri, 02 Feb 1996 03:04:05 GMT';
  //     const filterOperator: StringFilterProps = 'in';
  //     const filter = `${filterValue}:${filterOperator}`;

  //     const result = formatFilterType(filter, 'datetime', false);

  //     expect(result).toEqual({
  //       [filterOperator]: filterValue.split(','),
  //     });
  //   });

  //   it('should format filter with "notIn" operator properly', () => {
  //     const filterValue = 'Fri, 02 Feb 1996 03:04:05 GMT';
  //     const filterOperator: StringFilterProps = 'notIn';
  //     const filter = `${filterValue}:${filterOperator}`;

  //     const result = formatFilterType(filter, 'datetime', false);

  //     expect(result).toEqual({
  //       [filterOperator]: filterValue.split(','),
  //     });
  //   });

  //   it('should format filter with "lt" operator properly', () => {
  //     const filterValue = 'Fri, 02 Feb 1996 03:04:05 GMT';
  //     const filterOperator: StringFilterProps = 'lt';
  //     const filter = `${filterValue}:${filterOperator}`;

  //     const result = formatFilterType(filter, 'datetime', false);

  //     expect(result).toEqual({
  //       [filterOperator]: filterValue,
  //     });
  //   });

  //   it('should format filter with "lte" operator properly', () => {
  //     const filterValue = 'Fri, 02 Feb 1996 03:04:05 GMT';
  //     const filterOperator: StringFilterProps = 'lte';
  //     const filter = `${filterValue}:${filterOperator}`;

  //     const result = formatFilterType(filter, 'datetime', false);

  //     expect(result).toEqual({
  //       [filterOperator]: filterValue,
  //     });
  //   });

  //   it('should format filter with "gt" operator properly', () => {
  //     const filterValue = 'Fri, 02 Feb 1996 03:04:05 GMT';
  //     const filterOperator: StringFilterProps = 'gt';
  //     const filter = `${filterValue}:${filterOperator}`;

  //     const result = formatFilterType(filter, 'datetime', false);

  //     expect(result).toEqual({
  //       [filterOperator]: filterValue,
  //     });
  //   });

  //   it('should format filter with "gte" operator properly', () => {
  //     const filterValue = 'Fri, 02 Feb 1996 03:04:05 GMT';
  //     const filterOperator: StringFilterProps = 'gte';
  //     const filter = `${filterValue}:${filterOperator}`;

  //     const result = formatFilterType(filter, 'datetime', false);

  //     expect(result).toEqual({
  //       [filterOperator]: filterValue,
  //     });
  //   });
  // });
});
