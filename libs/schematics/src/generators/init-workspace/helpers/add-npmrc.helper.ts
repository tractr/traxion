import { Tree } from '@nrwl/devkit';

export function addNpmrc(tree: Tree) {
  tree.write('.npmrc', '@trxn:registry=https://registry.npmjs.org');
}
