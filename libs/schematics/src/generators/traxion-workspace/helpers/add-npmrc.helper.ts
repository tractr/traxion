import { Tree } from '@nrwl/devkit';

export function addNpmrc(tree: Tree) {
  tree.write('.npmrc', '@tractr:registry=https://npm.pkg.github.com');
}
