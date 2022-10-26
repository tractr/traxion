import { getImportPath, getWorkspaceLayout, Tree } from '@nrwl/devkit';

import { getNormalizedProjectDefaultsOptions } from '../../../../helpers';
import { DEFAULT_TRAXION_DIRECTORY } from '../../../../schematics.constants';
import { ApiAppGeneratorSchema, NormalizedOptions } from '../schema';

export function normalizeOptions(
  tree: Tree,
  { name: rawName }: ApiAppGeneratorSchema,
): NormalizedOptions {
  const { appsDir, npmScope } = getWorkspaceLayout(tree);
  const { name, projectRoot, projectName, projectDirectory } =
    getNormalizedProjectDefaultsOptions(tree, { name: rawName }, appsDir);

  return {
    name,
    projectName,
    projectRoot,
    projectDirectory,
    npmScope,
    appsDir,
    caslImportPath: getImportPath(npmScope, DEFAULT_TRAXION_DIRECTORY.casl),
    nestjsModelsImportPath: getImportPath(
      npmScope,
      DEFAULT_TRAXION_DIRECTORY['nestjs-models'],
    ),
    nestjsModelsCommonImportPath: getImportPath(
      npmScope,
      DEFAULT_TRAXION_DIRECTORY['nestjs-models-common'],
    ),
  };
}
