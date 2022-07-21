export function transformStringToArray(
  value: unknown,
  separator = ',',
): Array<unknown> {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const array = JSON.parse(value);
      if (Array.isArray(array)) return array;
    } catch {
      return value.split(separator);
    }
  }
  return [value];
}
