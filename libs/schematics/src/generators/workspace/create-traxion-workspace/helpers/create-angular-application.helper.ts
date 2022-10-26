import { Tree } from '@nrwl/devkit';

import pwaAppGenerator from '../../../apps/pwa/generator';
import { NormalizedOptions } from '../schema';

export async function createAngularApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { pwaName, apiName } = options;

  await pwaAppGenerator(tree, {
    name: pwaName,
    apiName,
  });
}
