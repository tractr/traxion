import { getWorkspaceLayout, Tree } from '@nrwl/devkit';

export function getImportPrefixPath(tree: Tree, directory = '') {
  const { npmScope } = getWorkspaceLayout(tree);
  return `@${npmScope}/${directory ? `${directory}-` : ''}`;
}
