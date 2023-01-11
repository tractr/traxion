import { Tree } from '@nrwl/devkit';

import adminGenerator from '../../admin-app/generator';
import { NormalizedOptions } from '../schema';

export async function createAdminApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  // const { adminName, generatedImportPath } = options;
  // await adminGenerator(tree, {
  //   name: adminName,
  //   reactAdminImportPath: `${generatedImportPath}react-admin`,
  //   rextClientImportPath: `${generatedImportPath}rext-client`,
  // });
}
