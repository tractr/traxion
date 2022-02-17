import { Tree } from '@nrwl/devkit';

export function addPackageJson(tree: Tree, path: string, name: string) {
  tree.write(path, JSON.stringify({ name, version: '0.0.1' }, null, 2));
}
