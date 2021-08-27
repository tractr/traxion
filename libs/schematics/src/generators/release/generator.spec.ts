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

  it('should run successfully', async () => {
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

    // expect package.json to have been updated
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();
    expect(packageJson.devDependencies[SEMVER_PACKAGE_NAME]).toBeDefined();
  });
});
