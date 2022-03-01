import { getWorkspaceLayout, Tree } from '@nrwl/devkit';

import {
  getImportPrefixPath,
  getNormalizedProjectDefaultsOptions,
} from '../../../helpers';
import { ApiAppGeneratorSchema, NormalizedOptions } from '../schema';

export function normalizeOptions(
  tree: Tree,
  {
    name: rawName,
    directory: rawDirectory,
    generatedDir,
  }: ApiAppGeneratorSchema,
): NormalizedOptions {
  const { appsDir, npmScope } = getWorkspaceLayout(tree);
  const { name, directory, projectRoot, projectName, projectDirectory } =
    getNormalizedProjectDefaultsOptions(
      tree,
      {
        name: rawName,
        directory: rawDirectory,
      },
      appsDir,
    );

  return {
    name,
    directory,
    projectName,
    projectRoot,
    projectDirectory,
    npmScope,
    appsDir,
    generatedImportPath: getImportPrefixPath(tree, generatedDir),
    generatedDir,
  };
}
