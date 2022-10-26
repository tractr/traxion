import { addProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import fetch, { Response } from 'node-fetch';

import { traxionVersion } from '../../../versions.constants';
import generator, { packagesToAdd } from './generator';

jest.mock('node-fetch');

describe('eslint generator', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(appTree, 'test', {
      projectType: 'library',
      root: 'libs/test',
      sourceRoot: 'libs/test/src',
    });
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

  it('should add the eslint configuration', async () => {
    await generator(appTree, {});

    // expect .eslintrc.json to have been updated
    expect(appTree.exists('.eslintrc.json')).toBe(true);
    const eslintRcJson = readJson(appTree, '.eslintrc.json');

    expect(eslintRcJson.settings).toEqual({
      'import/internal-regex': '^@(proj)/',
    });

    // expect package.json to have been updated
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();

    Object.keys(packagesToAdd).forEach((packageName) => {
      expect(packageJson.devDependencies[packageName]).toBeDefined();
    });

    expect(packageJson.devDependencies['@tractr/eslint-config']).toEqual(
      traxionVersion,
    );
  });
});
