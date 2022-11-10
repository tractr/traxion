import {
  ArrayFilterProps,
  BoolFilterProps,
  DateTimeFilterProps,
  EnumFilterProps,
  FilterProps,
  JsonFilterProps,
  NumberFilterProps,
  StringFilterProps,
  transformStringToArray,
} from '@tractr/common';

/**
 * Format a rest api filter query into a prisma where clause
 *
 * @param value - The api filter query (formatted like 'filterValue:filterOperator')
 * @param type - The type of the data to filter
 * @param multiple - Denote if the data to filter is an array or not
 *
 * @returns a prisma where clause
 */
export function formatFilterType<
  T extends 'datetime' | 'boolean' | 'json' | 'string' | 'number' | 'enum',
>(value: unknown, type: T, multiple = false) {
  // Extract filter operator and filter values
  const [filterType, ...rest] =
    typeof value === 'string' ? value.split(':').reverse() : [undefined, value];

  // Init equals as the default operator
  let filter: FilterProps = 'equals';

  // Init the default list of available operators to an empty array
  let filterProps: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let transform: (value: any) => any = (v: any) => v;

  // Affect the correct transform function and available list of operators depending on the type of the filter
  switch (type) {
    case 'datetime':
      filterProps = DateTimeFilterProps;
      transform = (v: unknown) => (typeof v === 'string' ? new Date(v) : v);
      break;
    case 'boolean':
      filterProps = BoolFilterProps;
      transform = (v: unknown) => (typeof v === 'string' ? v === 'true' : v);
      break;
    case 'json':
      filterProps = JsonFilterProps;
      transform = (v: string) => (typeof v === 'string' ? JSON.parse(v) : v);
      break;
    case 'string':
      filterProps = StringFilterProps;
      break;
    case 'number':
      filterProps = NumberFilterProps;
      transform = (v: string) => (typeof v === 'string' ? Number(v) : v);
      break;
    case 'enum':
      filterProps = EnumFilterProps;
      break;
    default:
      throw new Error('type not supported');
  }

  // If working with an array, override the operators with array operators
  if (multiple) filterProps = ArrayFilterProps;

  let valueToTransform = rest[0];

  if (filterProps.length > 0 && filterType && filterProps.includes(filterType))
    filter = filterType as FilterProps;
  else if (typeof filterType !== 'undefined') {
    rest.unshift(filterType);
    valueToTransform = rest.reverse().join(':');
  }

  // Construct the where clause
  // It is different, depending on if the operator expect to work with an array or not
  switch (filter) {
    // Equals is formatted differently depending on multiple
    case 'equals':
      if (multiple) {
        // eslint-disable-next-line no-case-declarations
        const arrayToTransform = transformStringToArray(valueToTransform);
        if (!Array.isArray(arrayToTransform))
          throw new Error('Invalid array to filter');

        return {
          [filter]: arrayToTransform.map(transform),
        };
      }
      return {
        [filter]: transform(valueToTransform),
      };
    // Those operators works with arrays
    case 'has':
    case 'hasEvery':
    case 'hasSome':
    case 'in':
    case 'isEmpty':
      // eslint-disable-next-line no-case-declarations
      const arrayToTransform = transformStringToArray(valueToTransform);
      if (!Array.isArray(arrayToTransform))
        throw new Error('Invalid array to filter');

      return {
        [filter]: arrayToTransform.map(transform),
      };
    // Those operators works with strings
    case 'array_contains':
    case 'array_ends_with':
    case 'array_starts_with':
    case 'contains':
    case 'endsWith':
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte':
    case 'not':
    case 'notIn':
    case 'path':
    case 'startsWith':
    case 'string_contains':
    case 'string_ends_with':
    case 'string_starts_with':
      return {
        [filter]: transform(valueToTransform),
      };
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Operator ${filter} does not exist in filter queries`);
  }
}
