import {
  addProjectConfiguration,
  readJson,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import generator, { SEMVER_PACKAGE_NAME } from './generator';
import { ReleaseGeneratorSchema } from './schema';

describe('release generator', () => {
  let appTree: Tree;
  const options: ReleaseGeneratorSchema = {
    project: 'test',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(appTree, 'test', {
      projectType: 'library',
      root: 'libs/test',
      sourceRoot: 'libs/test/src',
    });
  });

  it('should add release to a specific project', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');

    // expect workspace to have been update correctly
    expect(config).toBeDefined();
    expect(config.targets).toBeDefined();
    expect(config.targets?.release).toEqual({
      executor: `${SEMVER_PACKAGE_NAME}:version`,
      options: {
        syncVersions: false,
      },
    });
    expect(() => {
      readProjectConfiguration(appTree, 'workspace');
    }).toThrowError();

    // expect package.json to have been updated
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();
    expect(packageJson.devDependencies[SEMVER_PACKAGE_NAME]).toBeDefined();
  });

  it('should add release to the virtual workspace project', async () => {
    await generator(appTree, {});
    const config = readProjectConfiguration(appTree, 'test');

    // expect workspace to have been update correctly
    expect(config).toBeDefined();
    expect(config.targets).toBeUndefined();

    const workspace = readProjectConfiguration(appTree, 'workspace');

    expect(workspace.targets).toBeDefined();
    expect(workspace.targets?.release).toEqual({
      executor: `${SEMVER_PACKAGE_NAME}:version`,
      options: {
        syncVersions: true,
      },
    });

    // expect package.json to have been updated
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();
    expect(packageJson.devDependencies[SEMVER_PACKAGE_NAME]).toBeDefined();
  });
});
