import * as angular from '@nrwl/angular/generators';
import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as nestjs from '@nrwl/nest';

import * as hapifyTargetGenerator from '../target-generate/generator';
import generator from './generator';
import {
  HapifyLibraryGeneratorOptions,
  HapifyLibraryGeneratorOptionsWithExtra,
} from './schema';

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

describe('hapify library generator', () => {
  let appTree: Tree;
  const options: HapifyLibraryGeneratorOptions = {
    name: 'test',
    type: 'angular',
    hapifyTemplates: ['models'],
    hapifyModelsJson: 'hapify-models.json',
    hapifyAdditionalTemplates: '',
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
  });

  afterEach(() => {
    angularGenerator.mockClear();
    nestjsGenerator.mockClear();
    targetGenerator.mockClear();
  });

  it('should run successfully', async () => {
    await generator(appTree, options as HapifyLibraryGeneratorOptionsWithExtra);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });

  it('should have called angular generator', async () => {
    await generator(appTree, options as HapifyLibraryGeneratorOptionsWithExtra);
    const config = readProjectConfiguration(appTree, 'test');
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

    expect(appTree.exists('libs/test/.gitignore')).toBeTruthy();
    expect(appTree.read('libs/test/.gitignore')?.toString()).toContain(
      'hapify.json',
    );
    expect(appTree.read('libs/test/.gitignore')?.toString()).toContain(
      'generated',
    );
  });

  it('should generate a .hapifyrc.js file', async () => {
    await generator(appTree, {
      ...options,
      hapifyTemplates: [],
    });

    expect(appTree.exists('libs/test/.hapifyrc.js')).toBeTruthy();
    expect(appTree.read('libs/test/.hapifyrc.js')?.toString()).toEqual(`const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'test',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../hapify-models.json',
  extends: [],
  importReplacements: {}
};
`);
  });

  it('should generate a .hapifyrc.js file with the configured templates', async () => {
    await generator(appTree, {
      ...options,
      hapifyTemplates: ['models'],
      hapifyAdditionalTemplates:
        '@tractr/additional-templates-1,@tractr/additional-templates-2',
    });

    expect(appTree.exists('libs/test/.hapifyrc.js')).toBeTruthy();
    expect(appTree.read('libs/test/.hapifyrc.js')?.toString()).toEqual(`const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'test',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../hapify-models.json',
  extends: [
    '@tractr/hapify-templates-models',
    '@tractr/additional-templates-1',
    '@tractr/additional-templates-2',],
  importReplacements: {
  "mock": "@proj/models/mock"
}
};
`);
  });

  it('should generate a .hapifyrc.js file with the default import replacements by default', async () => {
    await generator(appTree, {
      ...options,
      hapifyTemplates: ['rext-client'],
    });

    expect(appTree.exists('libs/test/.hapifyrc.js')).toBeTruthy();
    expect(appTree.read('libs/test/.hapifyrc.js')?.toString()).toEqual(`const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'test',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../hapify-models.json',
  extends: [
    '@tractr/hapify-templates-rext-client',],
  importReplacements: {
  "models": "@proj/models",
  "rest-dtos": "@proj/rest-dtos",
  "mock": "@proj/rext-client/mock"
}
};
`);
  });

  it('should add the generate target to the project configuration', async () => {
    await generator(appTree, options as HapifyLibraryGeneratorOptionsWithExtra);

    const projectConfiguration = readProjectConfiguration(appTree, 'test');

    expect(targetGenerator).toBeCalledTimes(1);
    expect(projectConfiguration.targets?.generate).toBeDefined();
  });
});
