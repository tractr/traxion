import { join } from 'path';

import {
  addProjectConfiguration,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import generator, { SCHEMATICS_TRACTR_PACKAGE_NAME } from './generator';
import { TargetGenerateGeneratorSchema } from './schema';

describe('release generator', () => {
  let appTree: Tree;
  const rootPath = 'libs/test';
  const baseOptions = {
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
      ...baseOptions,
      ...{ project: 'unknownProject' },
    };

    await expect(async () => generator(appTree, options)).rejects.toThrow(
      "Cannot find configuration for 'unknown-project' in /workspace.json",
    );
  });

  it('should throw error if wrong input path is given', async () => {
    const options: TargetGenerateGeneratorSchema = {
      ...baseOptions,
      ...{ inputHapifyGeneratedPath: 'testInputFolder' },
    };

    await expect(async () => generator(appTree, options)).rejects.toThrow(
      `The folder "${join(rootPath, 'testInputFolder')}" does not exist`,
    );
  });

  it('should throw error if wrong output path is given', async () => {
    const options: TargetGenerateGeneratorSchema = {
      ...baseOptions,
      ...{ outputGeneratedPath: 'testOutputFolder' },
    };

    await expect(async () => generator(appTree, options)).rejects.toThrow(
      `The folder "${join(rootPath, 'testOutputFolder')}" does not exist`,
    );
  });

  it('should run successfully with good parameters', async () => {
    await generator(appTree, baseOptions);

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
        cleanFirst: true,
        format: true,
      },
    });
  });
});
