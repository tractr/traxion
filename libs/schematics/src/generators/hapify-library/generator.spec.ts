import { relative } from 'path';

import * as angular from '@nrwl/angular/generators';
import {
  getWorkspaceLayout,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as nestjs from '@nrwl/nest';
import fetch, { Response } from 'node-fetch';

import generator from './generator';
import {
  HapifyLibraryGeneratorOptions,
  HapifyLibraryGeneratorOptionsWithExtra,
} from './schema';
import * as hapifyTargetGenerator from '../target-generate/generator';

jest.mock('@nrwl/angular/generators', () => ({
  __esModule: true,
  ...jest.requireActual('@nrwl/angular/generators'),
}));
jest.mock('@nrwl/nest', () => ({
  __esModule: true,
  ...jest.requireActual('@nrwl/nest'),
}));
jest.mock('../target-generate/generator', () => ({
  __esModule: true,
  ...jest.requireActual('../target-generate/generator'),
}));
jest.mock('node-fetch');

describe('hapify library generator', () => {
  let appTree: Tree;
  const options: HapifyLibraryGeneratorOptions = {
    name: 'test',
    type: 'angular',
    hapifyTemplate: 'models',
    hapifyModelsJson: 'hapify-models.json',
    hapifyUseImportReplacements: true,
    useSecondaryEndpoint: true,
    addSecondaryEndpoint: [],
  };

  let angularGenerator: jest.SpyInstance;
  let nestjsGenerator: jest.SpyInstance;
  let targetGenerator: jest.SpyInstance;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();

    // write a empty gitignore to avoid angular warnings
    appTree.write('.gitignore', '');

    angularGenerator = jest.spyOn(angular, 'libraryGenerator');
    nestjsGenerator = jest.spyOn(nestjs, 'libraryGenerator');
    targetGenerator = jest.spyOn(hapifyTargetGenerator, 'default');

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            'dist-tags': { latest: '1.0.0' },
          }),
      }) as unknown as Promise<Response>,
    );
  });

  afterEach(() => {
    angularGenerator.mockClear();
    nestjsGenerator.mockClear();
    targetGenerator.mockClear();
  });

  it('should run successfully', async () => {
    await generator(appTree, options as HapifyLibraryGeneratorOptionsWithExtra);
    const config = readProjectConfiguration(appTree, 'common-test');
    expect(config).toBeDefined();
  });

  it('should have called angular generator', async () => {
    await generator(appTree, options as HapifyLibraryGeneratorOptionsWithExtra);
    const config = readProjectConfiguration(appTree, 'common-test');
    expect(config).toBeDefined();
    expect(angularGenerator).toHaveBeenCalledTimes(1);
    expect(nestjsGenerator).toHaveBeenCalledTimes(0);
  });

  it('should have called nestjs generator', async () => {
    await generator(appTree, {
      ...options,
      type: 'nest',
      directory: 'testDirectoryOptions',
    });
    const config = readProjectConfiguration(
      appTree,
      'test-directory-options-test',
    );
    expect(config).toBeDefined();
    expect(angularGenerator).toHaveBeenCalledTimes(0);
    expect(nestjsGenerator).toHaveBeenCalledTimes(1);
  });

  it('should generate a gitignore file', async () => {
    await generator(appTree, options as HapifyLibraryGeneratorOptionsWithExtra);

    const { libsDir } = getWorkspaceLayout(appTree);

    expect(appTree.exists(`${libsDir}/common/test/.gitignore`)).toBeTruthy();
    expect(
      appTree.read(`${libsDir}/common/test/.gitignore`)?.toString(),
    ).toContain('hapify.json');
    expect(
      appTree.read(`${libsDir}/common/test/.gitignore`)?.toString(),
    ).toContain('generated');
  });

  it('should generate a .hapifyrc.js file', async () => {
    await generator(appTree, {
      ...options,
      hapifyTemplates: [],
    });
    const { libsDir } = getWorkspaceLayout(appTree);

    expect(appTree.exists(`${libsDir}/common/test/.hapifyrc.js`)).toBeTruthy();

    const relativePath = relative(`${libsDir}/common/test`, '.');
    expect(appTree.read(`${libsDir}/common/test/.hapifyrc.js`)?.toString())
      .toEqual(`const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'test',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '${relativePath}/hapify-models.json',
  extends: [
    '@trxn/hapify-templates-models',
  ],
  importReplacements: {
  "mock": "@proj/common-models/mock"
}
};
`);
  });

  it('should generate a .hapifyrc.js file with the configured templates', async () => {
    await generator(appTree, {
      ...options,
      hapifyTemplates: ['models'],
      hapifyAdditionalTemplates:
        '@trxn/additional-templates-1,@trxn/additional-templates-2',
    });

    const { libsDir } = getWorkspaceLayout(appTree);

    expect(appTree.exists(`${libsDir}/common/test/.hapifyrc.js`)).toBeTruthy();

    const relativePath = relative(`${libsDir}/common/test`, '.');
    expect(appTree.read(`${libsDir}/common/test/.hapifyrc.js`)?.toString())
      .toEqual(`const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'test',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '${relativePath}/hapify-models.json',
  extends: [
    '@trxn/hapify-templates-models',
  ],
  importReplacements: {
  "mock": "@proj/common-models/mock"
}
};
`);
  });

  it('should generate a .hapifyrc.js file with the default import replacements by default', async () => {
    await generator(appTree, {
      ...options,
      hapifyTemplates: ['rext-client'],
    });

    const { libsDir } = getWorkspaceLayout(appTree);

    expect(appTree.exists(`${libsDir}/common/test/.hapifyrc.js`)).toBeTruthy();

    const relativePath = relative(`${libsDir}/common/test`, '.');
    expect(appTree.read(`${libsDir}/common/test/.hapifyrc.js`)?.toString())
      .toEqual(`const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@trxn/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'test',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '${relativePath}/hapify-models.json',
  extends: [
    '@trxn/hapify-templates-models',
  ],
  importReplacements: {
  "mock": "@proj/common-models/mock"
}
};
`);
  });

  it('should add the generate target to the project configuration', async () => {
    await generator(appTree, options as HapifyLibraryGeneratorOptionsWithExtra);

    const projectConfiguration = readProjectConfiguration(
      appTree,
      'common-test',
    );

    expect(targetGenerator).toBeCalledTimes(1);
    expect(projectConfiguration.targets?.generate).toBeDefined();
  });
});
