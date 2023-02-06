import { Tree } from '@nrwl/devkit';

import { getLogger } from '../../../helpers';
import pwaAppGenerator from '../../pwa-app/generator';
import { NormalizedOptions } from '../schema';

export async function createAngularApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const log = getLogger(tree);
  log.warn('Pwa application schematics is disabled for now');

  // const { pwaName, generatedDir, apiName, directory } = options;
  // await pwaAppGenerator(tree, {
  //   name: pwaName,
  //   directory,
  //   generatedDir,
  //   apiName,
  // });
}
