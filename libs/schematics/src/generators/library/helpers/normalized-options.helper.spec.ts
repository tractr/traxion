import { libraryGenerator as angularLibraryGenerator } from '@nrwl/angular/generators';
import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator as nestLibraryGenerator } from '@nrwl/nest';

import { LibraryGeneratorOptions } from '../schema';
import {
  normalizeGeneratorOptions,
  normalizeOptions,
} from './normalized-options.helper';

describe('library generator', () => {
  let appTree: Tree;
  const options: LibraryGeneratorOptions = {
    name: 'test',
    type: 'angular',
    hapifyTemplates: ['models'],
    hapifyModelsJson: 'hapify-models.json',
    hapifyAdditionalTemplates: '',
    hapifyUseImportReplacements: true,
    useSecondaryEndpoint: true,
    addSecondaryEndpoint: [],
    prefix: 'proj',
    importPath: '@test/test',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();

    // write a empty gitignore to avoid angular warnings
    appTree.write('.gitignore', '');
  });

  it('should run successfully with the default options and an angular lib', async () => {
    await angularLibraryGenerator(appTree, options);
    const normalizedOptions = normalizeOptions(appTree, options);

    expect(normalizedOptions).toEqual({
      ...options,
      fileName: 'test',
      hapifyImportReplacements: [],
      hapifyModelsJsonRelativePath: '../../hapify-models.json',
      projectDirectory: 'test',
      projectName: 'test',
      projectRoot: 'libs/test',
      secondaryEntrypoints: ['mock'],
      templates: ['@tractr/hapify-templates-models'],
    });
  });

  it('should run successfully with the default options and an nestjs lib', async () => {
    await nestLibraryGenerator(appTree, options);
    const normalizedOptions = normalizeOptions(appTree, options);

    expect(normalizedOptions).toEqual({
      ...options,
      fileName: 'test',
      hapifyImportReplacements: [],
      hapifyModelsJsonRelativePath: '../../hapify-models.json',
      projectDirectory: 'test',
      projectName: 'test',
      projectRoot: 'libs/test',
      secondaryEntrypoints: ['mock'],
      templates: ['@tractr/hapify-templates-models'],
    });
  });

  it('should run successfully with the direcytory options', async () => {
    await angularLibraryGenerator(appTree, options);
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      directory: 'test',
    });

    expect(normalizedOptions).toEqual({
      ...options,
      fileName: 'test-test',
      hapifyImportReplacements: [],
      hapifyModelsJsonRelativePath: '../../../hapify-models.json',
      projectDirectory: 'test/test',
      projectName: 'test-test',
      projectRoot: 'libs/test/test',
      secondaryEntrypoints: ['mock'],
      templates: ['@tractr/hapify-templates-models'],
    });
  });

  it('should run successfully with the additional templates and filter out the empty ones', async () => {
    await angularLibraryGenerator(appTree, options);
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      hapifyTemplates: ['casl', 'models'],
      hapifyAdditionalTemplates: 'test,,test2',
    });

    expect(normalizedOptions).toEqual({
      ...options,
      fileName: 'test',
      hapifyImportReplacements: [],
      hapifyAdditionalTemplates: 'test,,test2',
      hapifyModelsJsonRelativePath: '../../hapify-models.json',
      projectDirectory: 'test',
      projectName: 'test',
      projectRoot: 'libs/test',
      secondaryEntrypoints: ['mock'],
      hapifyTemplates: ['casl', 'models'],
      templates: [
        '@tractr/hapify-templates-casl',
        '@tractr/hapify-templates-models',
        'test',
        'test2',
      ],
    });
  });

  it('should still work if no template has been provided', async () => {
    await angularLibraryGenerator(appTree, options);
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hapifyTemplates: null as any,
    });

    expect(normalizedOptions).toEqual({
      ...options,
      fileName: 'test',
      hapifyImportReplacements: [],
      hapifyModelsJsonRelativePath: '../../hapify-models.json',
      projectDirectory: 'test',
      projectName: 'test',
      projectRoot: 'libs/test',
      secondaryEntrypoints: [],
      templates: [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hapifyTemplates: null as any,
    });
  });

  it('should work when adding additionals secondary entrypoints', async () => {
    await angularLibraryGenerator(appTree, options);
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      addSecondaryEndpoint: ['mock', 'mock2'],
    });

    expect(normalizedOptions).toEqual({
      ...options,
      fileName: 'test',
      hapifyImportReplacements: [],
      hapifyModelsJsonRelativePath: '../../hapify-models.json',
      projectDirectory: 'test',
      projectName: 'test',
      projectRoot: 'libs/test',
      addSecondaryEndpoint: ['mock', 'mock2'],
      secondaryEntrypoints: ['mock', 'mock2'],
      templates: ['@tractr/hapify-templates-models'],
    });
  });

  it('should select correctly the library options in function of the selected type', () => {
    const angularOptions = normalizeGeneratorOptions(options);
    const nestjsOptions = normalizeGeneratorOptions({
      ...options,
      type: 'nest',
    });

    expect(angularOptions).toEqual({
      addModuleSpec: undefined,
      addTailwind: undefined,
      buildable: undefined,
      commonModule: undefined,
      compilationMode: undefined,
      directory: undefined,
      flat: undefined,
      importPath: '@test/test',
      lazy: undefined,
      linter: undefined,
      name: 'test',
      parentModule: undefined,
      prefix: 'proj',
      publishable: undefined,
      routing: undefined,
      setParserOptionsProject: undefined,
      simpleModuleName: undefined,
      skipFormat: undefined,
      sourceDir: undefined,
      spec: undefined,
      standaloneConfig: undefined,
      strict: undefined,
      tags: undefined,
      unitTestRunner: undefined,
    });
    expect(nestjsOptions).toEqual({
      buildable: undefined,
      controller: undefined,
      directory: undefined,
      global: undefined,
      importPath: '@test/test',
      linter: undefined,
      name: 'test',
      publishable: undefined,
      service: undefined,
      setParserOptionsProject: undefined,
      skipFormat: undefined,
      skipTsConfig: undefined,
      standaloneConfig: undefined,
      strict: undefined,
      tags: undefined,
      target: undefined,
      testEnvironment: undefined,
      unitTestRunner: undefined,
    });
  });
});
