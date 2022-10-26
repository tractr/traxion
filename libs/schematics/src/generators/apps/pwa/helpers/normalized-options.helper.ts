import { getImportPath, getWorkspaceLayout, Tree } from '@nrwl/devkit';

import { getNormalizedProjectDefaultsOptions } from '../../../../helpers';
import { DEFAULT_TRAXION_DIRECTORY } from '../../../../schematics.constants';
import { NormalizedOptions, PwaAppGeneratorSchema } from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: PwaAppGeneratorSchema,
): NormalizedOptions {
  const { appsDir, npmScope } = getWorkspaceLayout(tree);

  const { name, projectRoot, projectName, projectDirectory } =
    getNormalizedProjectDefaultsOptions(tree, options, appsDir);

  return {
    name,
    projectName,
    projectRoot,
    projectDirectory,
    npmScope,
    appsDir,
    apiName: options.apiName,
    angularRextImportPath: getImportPath(
      npmScope,
      DEFAULT_TRAXION_DIRECTORY['angular-rext-client'],
    ),
    caslImportPath: getImportPath(npmScope, DEFAULT_TRAXION_DIRECTORY.casl),
    modelsImportPath: getImportPath(npmScope, DEFAULT_TRAXION_DIRECTORY.models),
  };
}
