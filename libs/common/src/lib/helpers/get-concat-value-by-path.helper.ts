/**
 * Get and concat value by path. Values can be undefined or null
 *
 * @param path the string path to the value
 * @param obj The obj to traverse
 * @returns an array of values (values can be undefined or null)
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

/**
 * Get and concat value by path, and exclude null and undefined values
 *
 * @param path the string path to the value
 * @param obj The obj to traverse
 * @returns an array of values (values can not be undefined or null)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getConcatValueByPath<T extends Array<unknown> = any[]>(
  path: string,
  obj?: unknown,
): T {
  // Filter clause remove nulls and undefined items (that are invalid in Prisma queries)
  return findAllValueByPath(path, obj).filter(
    (item) => !(item === null || item === undefined),
  ) as T;
}
