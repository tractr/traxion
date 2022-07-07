import {
  BoolFilterProps,
  DateTimeFilterProps,
  IntFilterProps,
  JsonFilterProps,
  StringFilterProps,
} from '@tractr/common';

export function formatFilterType<
  T extends 'datetime' | 'boolean' | 'json' | 'string' | 'integer',
>(value: string, type: T) {
  const [filterType, ...rest] = value.split(':').reverse();
  let filter = 'equals';

  if (type === 'datetime') {
    if ((DateTimeFilterProps as string[]).includes(filterType))
      filter = filterType;
    else rest.unshift(filterType);

    return { [filter]: new Date(rest.reverse().join(':')) };
  }
  if (type === 'boolean') {
    if ((BoolFilterProps as string[]).includes(filterType)) filter = filterType;
    else rest.unshift(filterType);

    return { [filter]: rest.reverse().join(':') === 'true' };
  }
  if (type === 'json') {
    if ((JsonFilterProps as string[]).includes(filterType)) filter = filterType;
    else rest.unshift(filterType);

    return { [filter]: JSON.parse(rest.reverse().join(':')) };
  }
  if (type === 'string') {
    if ((StringFilterProps as string[]).includes(filterType))
      filter = filterType;
    else rest.unshift(filterType);

    return { [filter]: rest.reverse().join(':') };
  }
  if (type === 'integer') {
    if ((IntFilterProps as string[]).includes(filterType)) filter = filterType;
    else rest.unshift(filterType);

    return { [filter]: parseInt(rest.reverse().join(':'), 10) };
  }
  throw new Error('type not supported');
}
