import { readFileSync } from 'fs';
import { join } from 'path';

import { addProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import * as helpers from '../../helpers/npm-run';
import generator, { SEMVER_PACKAGE_NAME } from './generator';

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
      readFileSync(join(__dirname, 'files', '.prettierrc.js__tmpl__')),
    );

    // assert npm run format has not been called
    expect(npmRunSpy).not.toHaveBeenCalled();

    // asset .prettierrc does not exists anymore
    expect(appTree.exists('.prettierrc')).toBe(false);

    // expect package.json to have been updated
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();
    expect(packageJson.devDependencies[SEMVER_PACKAGE_NAME]).toBeDefined();
  });

  it('should run and run the global format', async () => {
    await generator(appTree, { format: true });

    // expect .prettierrc.js to have been updated
    const prettierRc = appTree.read('.prettierrc.js');
    expect(prettierRc).toBeDefined();
    expect(prettierRc).toEqual(
      readFileSync(join(__dirname, 'files', '.prettierrc.js__tmpl__')),
    );
    expect(npmRunSpy).toHaveBeenCalledTimes(1);
  });
});
