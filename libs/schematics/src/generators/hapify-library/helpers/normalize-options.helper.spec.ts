import { Tree, updateWorkspaceConfiguration } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import {
  HapifyLibraryGeneratorOptions,
  HapifyLibraryGeneratorOptionsWithExtra,
} from '../schema';
import { normalizeOptions } from './normalize-options.helper';

describe('normalizeOptions', () => {
  let appTree: Tree;
  const npmScope = 'tractr';
  const workspaceLayout = {
    appsDir: 'apps',
    libsDir: 'libs',
  };

  const options: HapifyLibraryGeneratorOptions = {
    name: 'test',
    directory: 'test',
    type: 'angular',
    hapifyTemplates: ['models'],
    hapifyModelsJson: 'hapify-models.json',
    hapifyAdditionalTemplates: '',
    hapifyUseImportReplacements: true,
    useSecondaryEndpoint: true,
    addSecondaryEndpoint: [],
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();

    // Set npmScope and libDir in nx.json
    updateWorkspaceConfiguration(appTree, {
      version: 2,
      npmScope,
      workspaceLayout,
    });

    // write a empty gitignore to avoid angular warnings
    appTree.write('.gitignore', '');
  });

  it('should run successfully', async () => {
    const normalizedOptions = normalizeOptions(
      appTree,
      options as HapifyLibraryGeneratorOptionsWithExtra,
    );

    expect(normalizedOptions).toEqual({
      ...options,
      hapifyImportReplacements: { mock: '@tractr/test-models/mock' },
      hapifyModelsJsonRelativePath: '../../../hapify-models.json',
      projectDirectory: 'test/test',
      projectName: 'test-test',
      projectRoot: 'libs/test/test',
      secondaryEntrypoints: ['mock'],
      templates: ['@tractr/hapify-templates-models'],
      importPath: '@tractr/test-test',
      importPrefixPath: '@tractr/test-',
      npmScope,
      libsDir: 'libs',
      targets: {},
      extra: {},
    });
  });

  it('should format name and directory to kebab case', async () => {
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      name: 'PascalCase',
      directory: 'PascalCase',
    });

    expect(normalizedOptions.name).toEqual('pascal-case');
    expect(normalizedOptions.directory).toEqual('pascal-case');
  });

  it('should process project directory, name and root from name and directory inputs', async () => {
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      name: 'ProjectName',
      directory: 'ProjectDirectory',
    });

    expect(normalizedOptions.projectDirectory).toEqual(
      'project-directory/project-name',
    );
    expect(normalizedOptions.projectName).toEqual(
      'project-directory-project-name',
    );
    expect(normalizedOptions.projectRoot).toEqual(
      'libs/project-directory/project-name',
    );
    expect(normalizedOptions.importPath).toEqual(
      '@tractr/project-directory-project-name',
    );
  });

  it('should format hapify templates input', async () => {
    const expectedResult = [
      '@tractr/hapify-templates-models',
      'additional-template-1',
      'additional-template-2',
    ];

    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      hapifyAdditionalTemplates: 'additional-template-1,additional-template-2',
    });

    expect(normalizedOptions.templates).toEqual(expectedResult);
  });

  it('should format hapify import replacements', async () => {
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      hapifyTemplates: ['rest-dtos'],
    });

    expect(normalizedOptions.hapifyImportReplacements).toEqual({
      mock: '@tractr/test-rest-dtos/mock',
      models: '@tractr/test-models',
    });
  });

  it('should format entry points', async () => {
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      addSecondaryEndpoint: ['test', 'utils'],
    });

    expect(normalizedOptions.secondaryEntrypoints).toEqual([
      'mock',
      'test',
      'utils',
    ]);
  });

  it('should group extra properties in the extra object', async () => {
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      extraProp1: 'extraProp1',
      extraProp2: 'extraProp2',
    });

    expect(normalizedOptions.extra).toEqual({
      extraProp1: 'extraProp1',
      extraProp2: 'extraProp2',
    });
  });

  it('should run successfully with the directory options', async () => {
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      directory: 'test',
    });

    expect(normalizedOptions).toEqual({
      ...options,
      hapifyImportReplacements: { mock: '@tractr/test-models/mock' },
      hapifyModelsJsonRelativePath: '../../../hapify-models.json',
      projectDirectory: 'test/test',
      projectName: 'test-test',
      projectRoot: 'libs/test/test',
      npmScope: 'tractr',
      libsDir: 'libs',
      targets: {},
      importPath: '@tractr/test-test',
      importPrefixPath: '@tractr/test-',
      secondaryEntrypoints: ['mock'],
      templates: ['@tractr/hapify-templates-models'],
      extra: {},
    });
  });

  it('should run successfully with the additional templates and filter out the empty ones', async () => {
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      hapifyTemplates: ['casl', 'models'],
      hapifyAdditionalTemplates: 'test,,test2',
    });

    expect(normalizedOptions).toEqual({
      ...options,
      hapifyImportReplacements: {},
      hapifyAdditionalTemplates: 'test,,test2',
      hapifyModelsJsonRelativePath: '../../../hapify-models.json',
      projectDirectory: 'test/test',
      projectName: 'test-test',
      projectRoot: 'libs/test/test',
      npmScope: 'tractr',
      libsDir: 'libs',
      targets: {},
      importPath: '@tractr/test-test',
      importPrefixPath: '@tractr/test-',
      secondaryEntrypoints: ['mock'],
      hapifyTemplates: ['casl', 'models'],
      templates: [
        '@tractr/hapify-templates-casl',
        '@tractr/hapify-templates-models',
        'test',
        'test2',
      ],
      extra: {},
    });
  });

  it('should work when adding additional secondary entrypoints', async () => {
    const normalizedOptions = normalizeOptions(appTree, {
      ...options,
      addSecondaryEndpoint: ['mock', 'mock2'],
    });

    expect(normalizedOptions).toEqual({
      ...options,
      hapifyImportReplacements: { mock: '@tractr/test-models/mock' },
      hapifyModelsJsonRelativePath: '../../../hapify-models.json',
      projectDirectory: 'test/test',
      projectName: 'test-test',
      projectRoot: 'libs/test/test',
      npmScope: 'tractr',
      libsDir: 'libs',
      targets: {},
      importPath: '@tractr/test-test',
      importPrefixPath: '@tractr/test-',
      addSecondaryEndpoint: ['mock', 'mock2'],
      secondaryEntrypoints: ['mock', 'mock2'],
      templates: ['@tractr/hapify-templates-models'],
      extra: {},
    });
  });
});
