import { readFileSync } from 'fs';
import { join } from 'path';

import { addProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import * as helpers from '../../helpers/npm-run';
import generator from './generator';

describe('release generator', () => {
  let appTree: Tree;
  let npmRunSpy: jest.SpyInstance;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(appTree, 'test', {
      projectType: 'library',
      root: 'libs/test',
      sourceRoot: 'libs/test/src',
    });
    npmRunSpy = jest
      .spyOn(helpers, 'npmRun')
      .mockReturnValue(Promise.resolve());
  });

  it('should run and skip the global format', async () => {
    await generator(appTree, { format: false });

    // expect .prettierrc.js to have been updated
    const prettierRc = appTree.read('.prettierrc.js');
    expect(prettierRc).toBeDefined();
    expect(prettierRc).toEqual(
      readFileSync(join(__dirname, 'files', '.prettierrc.js')),
    );
    expect(npmRunSpy).not.toHaveBeenCalled();
    expect(appTree.exists('.prettierrc')).toBe(false);
  });

  it('should run and run the global format', async () => {
    await generator(appTree, { format: true });

    // expect .prettierrc.js to have been updated
    const prettierRc = appTree.read('.prettierrc.js');
    expect(prettierRc).toBeDefined();
    expect(npmRunSpy).toHaveBeenCalledTimes(1);
  });
});
