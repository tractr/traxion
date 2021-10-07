import {
  addProjectConfiguration,
  readJson,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import generator, { SEMVER_PACKAGE_NAME } from './generator';
import { NpmPublishGeneratorSchema } from './schema';

describe('release generator', () => {
  let appTree: Tree;
  const options: NpmPublishGeneratorSchema = {
    project: 'test',
    repository: 'https://github.com/tractr/stack',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(appTree, 'test', {
      projectType: 'library',
      root: 'libs/test',
      sourceRoot: 'libs/test/src',
    });
    appTree.write(
      'libs/test/package.json',
      JSON.stringify({
        name: 'test',
        version: '0.x.x',
      }),
    );
  });

  it('should run successfully with defaults', async () => {
    await generator(appTree, options);

    // expect workspace to have been update correctly
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
    expect(config.targets).toBeDefined();
    expect(config.targets?.publish).toEqual({
      executor: `${SEMVER_PACKAGE_NAME}:deploy`,
      options: {
        access: 'restricted',
      },
    });

    // expect package.json to have been updated
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();
    expect(packageJson.devDependencies[SEMVER_PACKAGE_NAME]).toBeDefined();

    // expect <projectPath>/package.json to have been updated
    const packageJsonProject = readJson(appTree, 'libs/test/package.json');
    expect(packageJsonProject).toBeDefined();
    expect(packageJsonProject.repository).toEqual({
      type: 'git',
      url: 'https://github.com/tractr/stack',
    });
    expect(packageJsonProject.publishConfig).toEqual({
      access: 'restricted',
      registry: 'https://npm.pkg.github.com',
    });
  });

  it('should run successfully with options', async () => {
    await generator(appTree, {
      ...options,
      access: 'public',
      registry: 'https://registry.npmjs.org',
    });

    // expect workspace to have been update correctly
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
    expect(config.targets).toBeDefined();
    expect(config.targets?.publish).toEqual({
      executor: `${SEMVER_PACKAGE_NAME}:deploy`,
      options: {
        access: 'public',
      },
    });

    // expect package.json to have been updated
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();
    expect(packageJson.devDependencies[SEMVER_PACKAGE_NAME]).toBeDefined();

    // expect <projectPath>/package.json to have been updated
    const packageJsonProject = readJson(appTree, 'libs/test/package.json');
    expect(packageJsonProject).toBeDefined();
    expect(packageJsonProject.repository).toEqual({
      type: 'git',
      url: 'https://github.com/tractr/stack',
    });
    expect(packageJsonProject.publishConfig).toEqual({
      access: 'public',
      registry: 'https://registry.npmjs.org',
    });
  });

  it('should fail if no package json', async () => {
    appTree.delete('libs/test/package.json');

    await expect(async () =>
      generator(appTree, {
        ...options,
        access: 'public',
        registry: 'https://registry.npmjs.org',
      }),
    ).rejects.toThrowError();
  });

  it('should fail if access is not public or restricted', async () => {
    await expect(async () =>
      generator(appTree, {
        ...options,
        access: 'other value',
      }),
    ).rejects.toThrowError();
  });
});
