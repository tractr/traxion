import { addProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import * as localPackageJson from '../../../package.json';
import generator, { packagesToAdd } from './generator';

describe('eslint generator', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(appTree, 'test', {
      projectType: 'library',
      root: 'libs/test',
      sourceRoot: 'libs/test/src',
    });
  });

  it('should add the eslint configuration', async () => {
    await generator(appTree);

    // expect .eslintrc.json to have been updated
    expect(appTree.exists('.eslintrc.json')).toBe(true);
    const eslintRcJson = readJson(appTree, '.eslintrc.json');

    expect(eslintRcJson.settings).toEqual({
      'import/internal-regex': '^@(generated)/',
    });

    // expect package.json to have been updated
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();

    packagesToAdd.forEach(({ packageName }) => {
      expect(packageJson.devDependencies[packageName]).toBeDefined();
    });

    expect(packageJson.devDependencies['@tractr/eslint-config']).toEqual(
      localPackageJson.version,
    );
  });
});
