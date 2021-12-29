import * as angular from '@nrwl/angular/generators';
import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as nestjs from '@nrwl/nest';

import generator from './generator';
import { LibraryGeneratorOptions } from './schema';

jest.mock('@nrwl/angular/generators', () => ({
  __esModule: true,
  ...jest.requireActual('@nrwl/angular/generators'),
}));
jest.mock('@nrwl/nest', () => ({
  __esModule: true,
  ...jest.requireActual('@nrwl/nest'),
}));

describe('library generator', () => {
  let appTree: Tree;
  const options: LibraryGeneratorOptions = {
    name: 'test',
    type: 'angular',
    hapifyTemplates: [],
    hapifyModelsJson: 'hapify-models.json',
    hapifyAdditionalTemplates: '',
    hapifyUseImportReplacements: true,
  };

  let angularGenerator: jest.SpyInstance;
  let nestjsGenerator: jest.SpyInstance;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();

    // write a empty gitignore to avoid angular warnings
    appTree.write('.gitignore', '');

    angularGenerator = jest.spyOn(angular, 'libraryGenerator');
    nestjsGenerator = jest.spyOn(nestjs, 'libraryGenerator');
  });

  afterEach(() => {
    angularGenerator.mockClear();
    nestjsGenerator.mockClear();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });

  it('should have called angular generator', async () => {
    await generator(appTree, options);
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
    await generator(appTree, options);

    expect(appTree.exists('libs/test/.gitignore')).toBeTruthy();
    expect(appTree.read('libs/test/.gitignore')?.toString()).toContain(
      'hapify.json',
    );
    expect(appTree.read('libs/test/.gitignore')?.toString()).toContain(
      'generated',
    );
  });

  it('should generate a .hapifyrc.js file', async () => {
    await generator(appTree, options);

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
  importReplacements: {},
};
`);
  });

  it('should generate a .hapifyrc.js file with the configured templates', async () => {
    await generator(appTree, {
      ...options,
      hapifyTemplates: ['prisma'],
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
    '@tractr/hapify-templates-prisma',
    '@tractr/additional-templates-1',
    '@tractr/additional-templates-2',
  ],
  importReplacements: {},
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
    '@tractr/hapify-templates-rext-client',
  ],
  importReplacements: {
    'models': '@proj/models',
    'rest-dtos': '@proj/rest-dtos',
  },
};
`);
  });
});
