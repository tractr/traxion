/**
 * Get and concat value by path
 * @param path the string path to the value
 * @param obj The obj to traverse
 * @returns an array of values
 */
export function getAllKeysByPath(
  path: string,
  obj: Record<string, any>,
): unknown[] {
  const [nextPath, ...nextKeys] = path.split('.');

  const currentObj = obj[nextPath];

  if (typeof currentObj === 'undefined')
    throw new Error(`${nextPath} is not a valid key`);

  if (nextKeys.length === 0) return currentObj;

  if (Array.isArray(currentObj))
    return currentObj.flatMap((item) =>
      getAllKeysByPath(nextKeys.join('.'), item),
    );

  const keys = getAllKeysByPath(nextKeys.join('.'), currentObj);
  return Array.isArray(keys) ? keys : [keys];
}
