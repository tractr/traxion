import {
  addProjectConfiguration,
  readJson,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { readJSON } from 'fs-extra';

import { PackageDefinition } from '../../helpers';
import generator, {
  SCHEMATICS_PACKAGE_JSON_PATH,
  SCHEMATICS_TRACTR_PACKAGE_NAME,
} from './generator';
import { TargetGenerateGeneratorSchema } from './schema';

describe('target-generate generator', () => {
  let appTree: Tree;
  const rootPath = 'libs/test';
  const defaultOptions = {
    project: 'test',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(appTree, 'test', {
      root: rootPath,
    });
  });

  it('should throw error if wrong project name is given', async () => {
    const options: TargetGenerateGeneratorSchema = {
      ...defaultOptions,
      ...{ project: 'unknownProject' },
    };

    await expect(async () => generator(appTree, options)).rejects.toThrow(
      "Cannot find configuration for 'unknown-project' in /workspace.json",
    );
  });

  it('should run successfully with good parameters and true boolean value', async () => {
    const options: TargetGenerateGeneratorSchema = {
      ...defaultOptions,
      ...{
        inputHapifyGeneratedPath: 'input-folder',
        outputGeneratedPath: 'output-folder',
        format: true,
        cleanFirst: true,
      },
    };
    await generator(appTree, options);

    // expect workspace to have been update correctly
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
    expect(config.targets).toBeDefined();
    expect(config.targets?.generate).toEqual({
      executor: `${SCHEMATICS_TRACTR_PACKAGE_NAME}:generate`,
      options: {
        cwd: rootPath,
        inputHapifyGeneratedPath: 'input-folder',
        outputGeneratedPath: 'output-folder',
      },
    });
  });

  it('should run successfully with good parameters and false boolean value', async () => {
    const options: TargetGenerateGeneratorSchema = {
      ...defaultOptions,
      ...{
        inputHapifyGeneratedPath: 'input-folder',
        outputGeneratedPath: 'output-folder',
        format: false,
        cleanFirst: false,
      },
    };

    await generator(appTree, options);

    // expect workspace to have been update correctly
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
    expect(config.targets).toBeDefined();
    expect(config.targets?.generate).toEqual({
      executor: `${SCHEMATICS_TRACTR_PACKAGE_NAME}:generate`,
      options: {
        cwd: rootPath,
        inputHapifyGeneratedPath: 'input-folder',
        outputGeneratedPath: 'output-folder',
        format: false,
        cleanFirst: false,
      },
    });

    // expect package.json devdependencies have been updated correctly
    const packageJsonSchematics: PackageDefinition = await readJSON(
      SCHEMATICS_PACKAGE_JSON_PATH,
    );
    const packageJsonProject = readJson(appTree, 'package.json');
    expect(packageJsonProject).toBeDefined();
    expect(packageJsonProject.devDependencies).toEqual({
      [SCHEMATICS_TRACTR_PACKAGE_NAME]: packageJsonSchematics.version,
    });
  });

  it('should run successfully with only required parameter', async () => {
    await generator(appTree, defaultOptions);

    // expect workspace to have been update correctly
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
    expect(config.targets).toBeDefined();
    expect(config.targets?.generate).toEqual({
      executor: `${SCHEMATICS_TRACTR_PACKAGE_NAME}:generate`,
      options: {
        cwd: rootPath,
      },
    });
  });
});
