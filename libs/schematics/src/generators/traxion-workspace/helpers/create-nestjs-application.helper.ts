import { Tree } from '@nrwl/devkit';

import apiAppGenerator from '../../api-app/generator';
import { NormalizedOptions } from '../schema';

export async function createNestjsApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { directory, apiName, generatedDir } = options;
  await apiAppGenerator(tree, {
    name: apiName,
    directory,
    generatedDir,
  });
}
