import { join } from 'path';

import { applicationGenerator as angularApplicationGenerator } from '@nrwl/angular/generators';
import { E2eTestRunner } from '@nrwl/angular/src/utils/test-runners';
import { Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';

import { addPackageJson } from '../../../helpers';
import { NormalizedOptions } from '../schema';

export async function createAngularApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { apiName, appsDir, npmScope, pwaName } = options;
  await angularApplicationGenerator(tree, {
    name: pwaName,
    linter: Linter.EsLint,
    standaloneConfig: true,
    addTailwind: true,
    backendProject: apiName,
    strict: true,
    style: 'less',
    e2eTestRunner: E2eTestRunner.None,
  });

  addPackageJson(
    tree,
    join(appsDir, pwaName, `package.json`),
    `@${npmScope}/${pwaName}`,
  );
}
