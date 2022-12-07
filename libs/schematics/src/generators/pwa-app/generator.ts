import { applicationGenerator as angularApplicationGenerator } from '@nrwl/angular/generators';
import { Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';

import {
  normalizeOptions,
  updateFiles,
  updatePackageJson,
  updateTargets,
} from './helpers';
import { PwaAppGeneratorSchema } from './schema';

export default async function pwaApplicationGenerator(
  tree: Tree,
  options: PwaAppGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);

  const { apiName, name } = normalizedOptions;

  await angularApplicationGenerator(tree, {
    name,
    linter: Linter.EsLint,
    standaloneConfig: true,
    addTailwind: true,
    backendProject: apiName,
    strict: true,
    style: 'less',
  });

  await updatePackageJson(tree, normalizedOptions);

  updateFiles(tree, normalizedOptions);

  updateTargets(tree, normalizedOptions);
}
