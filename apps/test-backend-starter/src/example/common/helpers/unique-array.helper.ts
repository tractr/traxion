export function uniq<T = unknown>(array: Array<T>): Array<T> {
  return [...new Set(array)];
}
