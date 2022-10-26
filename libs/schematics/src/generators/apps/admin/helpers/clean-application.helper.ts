import * as path from 'path';

import { Tree } from '@nrwl/devkit';

/**
 * Remove useless file in the generated application
 *
 * @param tree - File tree
 * @param applicationRoot - Path of the root of the application to clean
 */
export function cleanApplication(tree: Tree, applicationRoot: string) {
  const filesToRemove = [
    'src/app/app.tsx',
    'src/app/app.spec.tsx',
    'src/app/nx-welcome.tsx',
    'src/environments/environment.ts',
    'src/environments/environment.prod.ts',
    'src/main.tsx',
  ];

  filesToRemove.forEach((fileToRemove) => {
    tree.delete(path.join(applicationRoot, fileToRemove));
  });
}
