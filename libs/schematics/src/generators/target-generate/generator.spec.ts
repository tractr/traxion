import { join } from 'path';

import {
  addProjectConfiguration,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import generator, { SCHEMATICS_TRACTR_PACKAGE_NAME } from './generator';
import { TargetGenerateGeneratorSchema } from './schema';

describe('target-generate generator', () => {
  let appTree: Tree;
  const rootPath = 'libs/test';
  const defaultOptions = {
    project: 'test',
    inputHapifyGeneratedPath: 'input-folder',
    outputGeneratedPath: 'output-folder',
    format: true,
    cleanFirst: true,
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(appTree, 'test', {
      root: rootPath,
    });

    // create a test.json file to create the input-folder folder
    appTree.write(
      `${rootPath}/input-folder/test.json`,
      JSON.stringify({
        key: 'value',
      }),
    );

    // create a test.json file to create the output-folder folder
    appTree.write(
      `${rootPath}/output-folder/test.json`,
      JSON.stringify({
        key: 'value',
      }),
    );
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

  it('should run successfully with good parameters and default boolean value', async () => {
    await generator(appTree, defaultOptions);

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
      ...{ format: false, cleanFirst: false },
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
  });
});
