import { getWorkspaceLayout, Tree } from '@nrwl/devkit';

import { getNormalizedProjectDefaultsOptions } from '../../../../helpers';
import {
  AdminAppGeneratorSchema,
  AdminAppGeneratorSchemaWithExtra,
} from '../schema';

export interface NormalizedSchema extends AdminAppGeneratorSchema {
  npmScope: string;
  projectRoot: string;
  projectName: string;
  projectDirectory: string;
  extra: Record<string, unknown>;
}

/**
 * Normalize user inputs for the generator
 *
 * @param options - User options
 * @returns normalized options
 */
export function normalizeOptions(
  tree: Tree,
  {
    name: rawName,
    directory: rawDirectory,
    npmName: rawNpmName,
    reactAdminImportPath,
    rextClientImportPath,
    ...extra
  }: AdminAppGeneratorSchemaWithExtra,
): NormalizedSchema {
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
  const npmName =
    rawNpmName || `@${npmScope}/${directory ? `${directory}-` : ''}${name}`;

  return {
    name,
    directory,
    npmScope,
    npmName,
    projectRoot,
    projectName,
    projectDirectory,
    reactAdminImportPath,
    rextClientImportPath,
    extra,
  };
}
