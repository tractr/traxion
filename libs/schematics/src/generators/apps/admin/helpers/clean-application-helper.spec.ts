import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { cleanApplication } from './clean-application.helper';

describe('cleanApplication', () => {
  let tree: Tree;
  const applicationRoot = 'apps/admin';
  const filesToRemove = [
    'src/app/app.tsx',
    'src/app/app.spec.tsx',
    'src/app/nx-welcome.tsx',
    'src/environments/environment.ts',
    'src/environments/environment.prod.ts',
    'src/main.tsx',
  ];

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    filesToRemove.forEach((file) =>
      tree.write(`${applicationRoot}/${file}`, ''),
    );
  });

  it('should remove useless files from the generated application', () => {
    cleanApplication(tree, applicationRoot);

    filesToRemove.forEach((file) => {
      expect(tree.exists(`${applicationRoot}/${file}`)).toEqual(false);
    });
  });
});
