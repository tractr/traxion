export function transformStringToArray(
  value: unknown,
): Array<unknown> | unknown {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const array = JSON.parse(value);
      if (Array.isArray(array)) return array;
    } catch {
      return value.split(',');
    }
  }
  return value;
}
