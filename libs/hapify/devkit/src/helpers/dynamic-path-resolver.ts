import * as path from 'path';

/**
 * Resolve the dynamic path by adding the local path if its relative.
 * Else, if its absolute, return it as is.
 *
 * @param dynamicPath Dynamic path to resolve
 * @param localPath Local path to concat to dynamicPath if it is relative
 */
export function resolveDynamicPath(
  dynamicPath: string,
  localPath: string,
): string {
  // If the dynamic path is relative, resolve it with the local path
  if (dynamicPath.startsWith('.')) return path.join(localPath, dynamicPath);

  // Else, return the dynamic path as is
  return dynamicPath;
}
