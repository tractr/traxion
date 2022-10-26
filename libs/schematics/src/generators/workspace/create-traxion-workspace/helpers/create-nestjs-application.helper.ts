import { Tree } from '@nrwl/devkit';

import apiAppGenerator from '../../../apps/api/generator';
import { NormalizedOptions } from '../schema';

export async function createNestjsApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { apiName } = options;
  await apiAppGenerator(tree, {
    name: apiName,
  });
}
