import { getWorkspaceLayout, names, Tree } from '@nrwl/devkit';

import { AdminAppGeneratorSchema } from '../schema';

export interface NormalizedSchema extends AdminAppGeneratorSchema {
  npmScope: string;
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
  }: AdminAppGeneratorSchema,
): NormalizedSchema {
  const { npmScope } = getWorkspaceLayout(tree);
  const name = names(rawName).fileName;
  const directory = rawDirectory ? names(rawDirectory).fileName : undefined;
  const npmName =
    rawNpmName || `@${npmScope}/${directory ? `${directory}-` : ''}${name}`;

  return {
    name,
    directory,
    npmScope,
    npmName,
    reactAdminImportPath,
    rextClientImportPath,
    extra,
  };
}
