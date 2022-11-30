import { Tree } from '@nrwl/devkit';

export function addNpmrc(tree: Tree) {
  tree.write('.npmrc', '@trxn:registry=https://npm.pkg.github.com');
}
