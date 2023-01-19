import { Tree } from '@nrwl/devkit';

import { getLogger } from '../../../helpers';
import apiAppGenerator from '../../api-app/generator';
import { NormalizedOptions } from '../schema';

export async function createNestjsApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const log = getLogger(tree);
  log.warn('Nestjs application schematics is disabled for now');

  // const { directory, apiName, generatedDir } = options;
  // await apiAppGenerator(tree, {
  //   name: apiName,
  //   directory,
  //   generatedDir,
  // });
}
