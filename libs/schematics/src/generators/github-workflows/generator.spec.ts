import { readFile } from 'fs/promises';
import { join } from 'path';

import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as enquirer from 'enquirer';

import generator from './generator';

describe('github-workflow generator', () => {
  let appTree: Tree;
  const mockPrompt = jest.spyOn(enquirer, 'prompt');

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    mockPrompt.mockReset();
  });

  it('should fail if we try to use the generator with the both options', async () => {
    await expect(async () =>
      generator(appTree, { all: true, workflow: ['test'] }),
    ).rejects.toThrowError(`Cannot use both --all and --workflows`);
  });

  it('should fail if we try to use the generator without one of the option', async () => {
    mockPrompt.mockReturnValueOnce(Promise.resolve({ workflow: [] }));
    await expect(async () => generator(appTree, {})).rejects.toThrowError(
      `Must use one of --all or --workflow`,
    );
    expect(mockPrompt).toHaveBeenCalledTimes(1);
  });

  it('should call the prompt function to ask which workflow you want to generate', async () => {
    mockPrompt.mockReturnValueOnce(Promise.resolve({ workflow: ['test'] }));
    await generator(appTree, {});
    expect(mockPrompt).toHaveBeenCalledTimes(1);
  });

  it('should fail if we try to use the generator with an non existing workflow', async () => {
    await expect(async () =>
      generator(appTree, {
        workflow: ['unknown'],
      }),
    ).rejects.toThrowError(`Use of an unknown workflow: unknown`);
  });

  it('should create the test workflow inside the app tree', async () => {
    await generator(appTree, { workflow: ['test'] });

    // Checks against test workflow
    expect(appTree.exists('.github/workflows/test.yml')).toBe(true);
    const testTemplateWorkflow = await readFile(
      join(__dirname, './files/test/workflows/test.yml__template__'),
    );

    const testWorkflow = appTree.read('.github/workflows/test.yml');
    expect(testWorkflow).toEqual(testTemplateWorkflow);
  });

  it('should create the semantic workflow inside the app tree', async () => {
    await generator(appTree, { workflow: ['semantic'] });

    // Checks against semantic workflow
    expect(appTree.exists('.github/workflows/semantic.yml')).toBe(true);
    const semanticTemplateWorkflow = await readFile(
      join(__dirname, './files/semantic/workflows/semantic.yml__template__'),
    );

    const semanticWorkflow = appTree.read('.github/workflows/semantic.yml');
    expect(semanticWorkflow).toEqual(semanticTemplateWorkflow);
  });

  it('should create the release workflow inside the app tree', async () => {
    await generator(appTree, { workflow: ['release'] });

    // Checks against release workflow
    expect(appTree.exists('.github/workflows/release.yml')).toBe(true);
    const releaseTemplateWorkflow = await readFile(
      join(__dirname, './files/release/workflows/release.yml__template__'),
    );

    const releaseWorkflow = appTree.read('.github/workflows/release.yml');
    expect(releaseWorkflow).toEqual(releaseTemplateWorkflow);
  });

  it('should create the test and semantic workflow inside the app tree via the multi workflow option', async () => {
    await generator(appTree, { workflow: ['test', 'semantic'] });
    // Checks against semantic workflow
    expect(appTree.exists('.github/workflows/semantic.yml')).toBe(true);
    const semanticTemplateWorkflow = await readFile(
      join(__dirname, './files/semantic/workflows/semantic.yml__template__'),
    );

    const semanticWorkflow = appTree.read('.github/workflows/semantic.yml');
    expect(semanticWorkflow).toEqual(semanticTemplateWorkflow);

    // Checks against test workflow
    expect(appTree.exists('.github/workflows/test.yml')).toBe(true);
    const testTemplateWorkflow = await readFile(
      join(__dirname, './files/test/workflows/test.yml__template__'),
    );

    const testWorkflow = appTree.read('.github/workflows/test.yml');
    expect(testWorkflow).toEqual(testTemplateWorkflow);

    expect(appTree.exists('.github/workflows/release.yml')).toBe(false);
  });

  it('should create the test and semantic workflow inside the app tree via the all option', async () => {
    await generator(appTree, { all: true });

    // Checks against semantic workflow
    expect(appTree.exists('.github/workflows/semantic.yml')).toBe(true);
    const semanticTemplateWorkflow = await readFile(
      join(__dirname, './files/semantic/workflows/semantic.yml__template__'),
    );

    const semanticWorkflow = appTree.read('.github/workflows/semantic.yml');
    expect(semanticWorkflow).toEqual(semanticTemplateWorkflow);

    // Checks against test workflow
    expect(appTree.exists('.github/workflows/test.yml')).toBe(true);
    const testTemplateWorkflow = await readFile(
      join(__dirname, './files/test/workflows/test.yml__template__'),
    );

    const testWorkflow = appTree.read('.github/workflows/test.yml');
    expect(testWorkflow).toEqual(testTemplateWorkflow);

    // Checks against release workflow
    expect(appTree.exists('.github/workflows/release.yml')).toBe(true);
    const releaseTemplateWorkflow = await readFile(
      join(__dirname, './files/release/workflows/release.yml__template__'),
    );

    const releaseWorkflow = appTree.read('.github/workflows/release.yml');
    expect(releaseWorkflow).toEqual(releaseTemplateWorkflow);
  });
});
