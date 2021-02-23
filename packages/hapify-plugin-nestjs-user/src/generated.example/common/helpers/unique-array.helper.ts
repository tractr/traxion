export function uniq<T = unknown>(array: Array<T>): Array<T> {
  return [...new Set(array)];
}

export function uniqueConcat<T = unknown>(
  firstArray: T[],
  secondeArray: T[]
): T[] {
  return uniq((firstArray ?? []).concat(secondeArray ?? []));
}
