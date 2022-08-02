/**
 * Get and concat value by path
 * @param path the string path to the value
 * @param obj The obj to traverse
 * @returns an array of values
 */
export function findAllValueByPath(path: string, obj?: unknown): unknown[] {
  const [nextPath, ...nextKeys] = path.split('.');

  if (typeof obj === 'undefined') {
    return [];
  }

  if (typeof obj !== 'object' || obj === null) {
    if (nextKeys.length > 0) return [];
    return [obj];
  }

  if (Array.isArray(obj))
    return obj.flatMap((item) => findAllValueByPath(path, item));

  const currentObj = (obj as Record<string, unknown>)[nextPath];

  if (typeof currentObj === 'undefined') return [];

  if (nextKeys.length === 0) return [currentObj];

  if (Array.isArray(currentObj))
    return currentObj.flatMap((item) =>
      findAllValueByPath(nextKeys.join('.'), item),
    );

  return findAllValueByPath(nextKeys.join('.'), currentObj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getConcatValueByPath<T extends Array<unknown> = any[]>(
  path: string,
  obj?: unknown,
): T {
  return findAllValueByPath(path, obj) as T;
}
