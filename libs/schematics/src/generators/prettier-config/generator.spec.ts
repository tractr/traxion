import { readFileSync } from 'fs';
import { join } from 'path';

import { addProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import fetch, { Response } from 'node-fetch';

import generator, { packagesToAdd } from './generator';
import * as localPackageJson from '../../../package.json';
import { npmRun } from '../../helpers/npm-run';

jest.mock('../../helpers/npm-run');
jest.mock('node-fetch');

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
    npmRunSpy = npmRun as jest.MockedFunction<typeof npmRun>;
    // Mock node fetch http call
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            'dist-tags': { latest: '1.0.0' },
          }),
      }) as unknown as Promise<Response>,
    );
  });

  it('should run and skip the global format', async () => {
    await generator(appTree, { format: false });

    // expect .prettierrc.js to have been updated
    const prettierRc = appTree.read('.prettierrc.js');
    expect(prettierRc).toBeDefined();
    expect(prettierRc).toEqual(
      readFileSync(join(__dirname, 'files', '.prettierrc.js__tmpl__')),
    );

    const prettierIgnore = appTree.read('.prettierignore');
    expect(prettierIgnore).toBeDefined();
    expect(prettierIgnore).toEqual(
      readFileSync(join(__dirname, 'files', '.prettierignore__tmpl__')),
    );

    // assert npm run format has not been called
    expect(npmRunSpy).not.toHaveBeenCalled();

    // asset .prettierrc does not exists anymore
    expect(appTree.exists('.prettierrc')).toBe(false);

    // expect package.json to have been updated
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();

    packagesToAdd.forEach(({ packageName }) => {
      expect(packageJson.devDependencies[packageName]).toBeDefined();
    });

    expect(packageJson.devDependencies['@trxn/prettier-config']).toEqual(
      localPackageJson.version,
    );

    expect(npmRunSpy).toHaveBeenCalledTimes(0);
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

  it('should work even if no .prettierrc exists', async () => {
    appTree.delete('.prettierrc');

    await generator(appTree, { format: false });

    expect(appTree.exists('.prettierrc')).toBe(false);
  });
});
