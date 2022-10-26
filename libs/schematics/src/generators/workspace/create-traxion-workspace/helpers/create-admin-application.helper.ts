import { getImportPath, getWorkspaceLayout, Tree } from '@nrwl/devkit';

import { DEFAULT_TRAXION_DIRECTORY } from '../../../../schematics.constants';
import adminGenerator from '../../../apps/admin/generator';
import { NormalizedOptions } from '../schema';

export async function createAdminApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { npmScope } = getWorkspaceLayout(tree);
  const { adminName } = options;
  await adminGenerator(tree, {
    name: adminName,
    reactAdminImportPath: getImportPath(
      npmScope,
      DEFAULT_TRAXION_DIRECTORY['react-admin'],
    ),
    rextClientImportPath: getImportPath(
      npmScope,
      DEFAULT_TRAXION_DIRECTORY['rext-client'],
    ),
  });
}
