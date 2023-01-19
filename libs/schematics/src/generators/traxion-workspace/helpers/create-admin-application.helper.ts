import { Tree } from '@nrwl/devkit';

import { getLogger } from '../../../helpers';
import adminGenerator from '../../admin-app/generator';
import { NormalizedOptions } from '../schema';

export async function createAdminApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const log = getLogger(tree);
  log.warn('Admin application schematics is disabled for now');

  // TODO: after migration 11 get back the admin generator
  // const { adminName, generatedImportPath } = options;
  // await adminGenerator(tree, {
  //   name: adminName,
  //   reactAdminImportPath: `${generatedImportPath}react-admin`,
  //   rextClientImportPath: `${generatedImportPath}rext-client`,
  // });
}
