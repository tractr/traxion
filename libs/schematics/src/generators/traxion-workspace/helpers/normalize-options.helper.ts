import { join } from 'path';

import { getWorkspaceLayout, Tree } from '@nrwl/devkit';
import { v4 as uuid4 } from 'uuid';

import { getImportPrefixPath } from '../../../helpers';
import { NormalizedOptions, TraxionWorkspaceGeneratorSchema } from '../schema';

export async function normalizeOptions(
  tree: Tree,
  options: TraxionWorkspaceGeneratorSchema,
): Promise<NormalizedOptions> {
  const { libsDir, appsDir, npmScope } = getWorkspaceLayout(tree);
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  const packageVersion = (
    await import(join(__dirname, '..', '..', '..', '..', 'package.json'))
  ).version;

  const generatedDir = 'generated';

  return {
    ...options,
    npmScope,
    appsDir,
    libsDir,
    adminName: 'admin',
    apiName: 'api',
    pwaName: 'pwa',
    generatedDir,
    generatedImportPath: getImportPrefixPath(tree, generatedDir),
    workspaceName: options.name,
    parsedTags,
    packageVersion,
    uuid4: uuid4(),
  };
}
