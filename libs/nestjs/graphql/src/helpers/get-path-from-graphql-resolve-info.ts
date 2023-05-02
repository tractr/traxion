import { Path } from 'graphql/jsutils/Path';

export function getPathFromGraphQLResolveInfo({ prev, key }: Path): string {
  if (typeof prev !== 'undefined') {
    const path = getPathFromGraphQLResolveInfo(prev);

    if (typeof key === 'number') {
      return path;
    }

    if (path === '') {
      return key;
    }

    return `${path}.${key}`;
  }

  return '';
}
