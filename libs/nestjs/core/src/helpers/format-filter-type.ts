import {
  ArrayFilterProps,
  BoolFilterProps,
  DateTimeFilterProps,
  EnumFilterProps,
  JsonFilterProps,
  NumberFilterProps,
  StringFilterProps,
  transformStringToArray,
} from '@tractr/common';

export function formatFilterType<
  T extends 'datetime' | 'boolean' | 'json' | 'string' | 'number' | 'enum',
>(value: unknown, type: T, multiple = false) {
  const [filterType, ...rest] =
    typeof value === 'string' ? value.split(':').reverse() : [undefined, value];
  let filter = 'equals';

  let filterProps: string[] = [];
  let transform = (v: any) => v;

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
      filter = 'hasSome';
      break;

    default:
      throw new Error('type not supported');
  }

  if (multiple) filterProps = ArrayFilterProps;

  let valueToTransform = rest[0];
  if (filterProps.length > 0 && filterType && filterProps.includes(filterType))
    filter = filterType;
  else if (typeof filterType !== 'undefined') {
    rest.unshift(filterType);
    valueToTransform = rest.reverse().join(':');
  }

  if (multiple) {
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
}
