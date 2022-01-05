import { relative } from 'path';

import {
  getWorkspaceLayout,
  joinPathFragments,
  names,
  Tree,
} from '@nrwl/devkit';

import {
  DEFAULT_IMPORT_REPLACEMENTS,
  DEFAULT_SECONDARY_ENTRY_POINTS,
} from '../../../schematics.constants';
import {
  AngularLibraryGeneratorOptions,
  LibraryGeneratorOptions,
  NestjsLibraryGeneratorOptions,
  NormalizedOptions,
} from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: LibraryGeneratorOptions,
): NormalizedOptions {
  const { libsDir, npmScope } = getWorkspaceLayout(tree);
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;

  const projectName = projectDirectory.replace(/\//g, '-');
  const fileName = projectName;
  const projectRoot = joinPathFragments(libsDir, projectDirectory);
  const hapifyTemplates = options.hapifyTemplates || [];

  const templates =
    hapifyTemplates
      .map((template) => `@tractr/hapify-templates-${template}`)
      .concat(...options.hapifyAdditionalTemplates.split(','))
      .filter((template) => template !== '') || [];

  const defaultEntrypoint = [
    ...new Set(
      hapifyTemplates.flatMap(
        (template) => DEFAULT_SECONDARY_ENTRY_POINTS[template] || [],
      ),
    ),
  ];
  const secondaryEntrypoints = [
    ...new Set(
      defaultEntrypoint.concat(...(options.addSecondaryEndpoint || [])),
    ),
  ];

  const normalized: NormalizedOptions = {
    type: options.type,
    hapifyTemplates: options.hapifyTemplates,
    hapifyAdditionalTemplates: options.hapifyAdditionalTemplates,
    templates,
    name: options.name,
    fileName,
    prefix: npmScope,
    projectDirectory,
    projectName,
    projectRoot,
    hapifyModelsJson: options.hapifyModelsJson,
    hapifyModelsJsonRelativePath: relative(
      projectRoot,
      options.hapifyModelsJson,
    ),
    hapifyUseImportReplacements: options.hapifyUseImportReplacements,
    hapifyImportReplacements: [
      ...new Set(
        hapifyTemplates.flatMap(
          (template) => DEFAULT_IMPORT_REPLACEMENTS[template],
        ),
      ),
    ],
    addSecondaryEndpoint: options.addSecondaryEndpoint,
    useSecondaryEndpoint: options.useSecondaryEndpoint,
    secondaryEntrypoints,
    importPath: options.importPath || options.name,
  };

  return normalized;
}

export function normalizeGeneratorOptions({
  type,
  name,
  buildable,
  controller,
  directory,
  global,
  importPath,
  linter,
  publishable,
  service,
  skipFormat,
  skipTsConfig,
  strict,
  tags,
  target,
  testEnvironment,
  unitTestRunner,
  standaloneConfig,
  setParserOptionsProject,
  addTailwind,
  simpleModuleName,
  addModuleSpec,
  sourceDir,
  spec,
  flat,
  commonModule,
  prefix,
  routing,
  lazy,
  parentModule,
  compilationMode,
}: LibraryGeneratorOptions): typeof type extends 'angular'
  ? AngularLibraryGeneratorOptions
  : NestjsLibraryGeneratorOptions {
  if (type === 'angular')
    return {
      name,
      addTailwind,
      skipFormat,
      simpleModuleName,
      addModuleSpec,
      directory,
      sourceDir,
      buildable,
      publishable,
      importPath,
      standaloneConfig,
      spec,
      flat,
      commonModule,
      prefix,
      routing,
      lazy,
      parentModule,
      tags,
      strict,
      linter,
      unitTestRunner,
      compilationMode,
      setParserOptionsProject,
    } as AngularLibraryGeneratorOptions;

  return {
    name,
    buildable,
    controller,
    directory,
    global,
    importPath,
    linter,
    publishable,
    service,
    skipFormat,
    skipTsConfig,
    strict,
    tags,
    target,
    testEnvironment,
    unitTestRunner,
    standaloneConfig,
    setParserOptionsProject,
  } as NestjsLibraryGeneratorOptions;
}
