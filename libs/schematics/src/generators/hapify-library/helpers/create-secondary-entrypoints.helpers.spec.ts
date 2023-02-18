import * as angular from '@nrwl/angular/generators';
import { libraryGenerator as angularLibraryGenerator } from '@nrwl/angular/generators';
import { readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator as nestLibraryGenerator } from '@nrwl/nest';

import { createSecondaryEntrypoints } from './create-secondary-entrypoints.helper';
import { NormalizedOptions } from '../schema';

jest.mock('@nrwl/angular/generators', () => ({
  __esModule: true,
  ...jest.requireActual('@nrwl/angular/generators'),
}));
jest.mock('@nrwl/nest', () => ({
  __esModule: true,
  ...jest.requireActual('@nrwl/nest'),
}));

describe('createSecondaryEntrypoint', () => {
  let appTree: Tree;
  const options: NormalizedOptions = {
    name: 'test',
    type: 'angular',
    hapifyTemplate: 'models',
    hapifyModelsJson: 'hapify-models.json',
    hapifyUseImportReplacements: true,
    useSecondaryEndpoint: true,
    addSecondaryEndpoint: [],
    projectName: 'test',
    projectRoot: 'test',
    projectDirectory: 'test',
    hapifyModelsJsonRelativePath: '../../hapify-models.json',
    template: '',
    hapifyImportReplacements: {},
    secondaryEntrypoints: ['mock'],
    npmScope: 'test',
    importPath: '@test/test',
    importPrefixPath: '@test/',
    libsDir: '.',
    targets: {},
    extra: {},
  };

  let librarySecondaryEntryPointGenerator: jest.SpyInstance;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();

    // write a empty gitignore to avoid angular warnings
    appTree.write('.gitignore', '');

    librarySecondaryEntryPointGenerator = jest.spyOn(
      angular,
      'librarySecondaryEntryPointGenerator',
    );
  });

  afterEach(() => {
    librarySecondaryEntryPointGenerator.mockClear();
  });

  it('should run successfully with the default options and an angular lib', async () => {
    await angularLibraryGenerator(appTree, options);
    await createSecondaryEntrypoints(appTree, options);

    const packageJson = readJson(appTree, 'test/package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.name).toEqual('@test/test');
    expect(packageJson.version).toEqual('0.0.1');
    expect(librarySecondaryEntryPointGenerator).toHaveBeenCalledTimes(1);
  });

  it('should run successfully with the default options and an nestjs lib', async () => {
    await nestLibraryGenerator(appTree, options);
    await createSecondaryEntrypoints(appTree, options);

    const packageJson = readJson(appTree, 'test/package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.name).toEqual('@test/test');
    expect(packageJson.version).toEqual('0.0.1');
    expect(librarySecondaryEntryPointGenerator).toHaveBeenCalledTimes(1);
  });

  it('should run successfully and do nothing if the options useSecondaryEndpoint is false', async () => {
    await angularLibraryGenerator(appTree, options);
    await createSecondaryEntrypoints(appTree, options);

    const packageJson = readJson(appTree, 'test/package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.name).toEqual('@test/test');
    expect(packageJson.version).toEqual('0.0.1');
    expect(librarySecondaryEntryPointGenerator).toHaveBeenCalledTimes(1);
  });
});
