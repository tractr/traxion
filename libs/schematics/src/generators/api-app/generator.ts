import { Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { applicationGenerator as nestjsApplicationGenerator } from '@nrwl/nest';

import {
  normalizeOptions,
  updateFiles,
  updatePackageJson,
  updateTargets,
} from './helpers';
import { ApiAppGeneratorSchema } from './schema';

export default async function pwaApplicationGenerator(
  tree: Tree,
  options: ApiAppGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);

  const { name } = normalizedOptions;

  await nestjsApplicationGenerator(tree, {
    name,
    linter: Linter.EsLint,
    standaloneConfig: true,
  });

  await updatePackageJson(tree, normalizedOptions);

  updateFiles(tree, normalizedOptions);

  updateTargets(tree, normalizedOptions);
}
