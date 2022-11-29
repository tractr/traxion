import { relative } from 'path';

import { getWorkspaceLayout, Tree } from '@nrwl/devkit';

import {
  getImportPrefixPath,
  getNormalizedProjectDefaultsOptions,
} from '../../../helpers';
import {
  DEFAULT_IMPORT_REPLACEMENTS,
  DEFAULT_SECONDARY_ENTRY_POINTS,
  DEFAULT_TARGETS_OPTIONS,
} from '../../../schematics.constants';
import {
  HapifyLibraryGeneratorOptionsWithExtra,
  NormalizedOptions,
} from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: HapifyLibraryGeneratorOptionsWithExtra,
): NormalizedOptions {
  const {
    name: rawName,
    directory: rawDirectory,
    type,
    hapifyTemplate,
    hapifyModelsJson,
    hapifyUseImportReplacements,
    useSecondaryEndpoint,
    addSecondaryEndpoint,
    ...extra
  } = options;

  // Fetch workspace data
  const { libsDir, npmScope } = getWorkspaceLayout(tree);

  const { name, directory, projectDirectory, projectRoot, projectName } =
    getNormalizedProjectDefaultsOptions(tree, {
      name: rawName || hapifyTemplate,
      directory: rawDirectory,
    });

  // Format hapify template inputs
  const template = `@trxn/hapify-templates-${hapifyTemplate}`;

  // Format hapify model path
  const hapifyModelsJsonRelativePath = relative(
    projectRoot,
    options.hapifyModelsJson,
  );

  const importPrefixPath = getImportPrefixPath(tree, directory);

  // Format import replacement
  const hapifyImportReplacements: Record<string, string> =
    DEFAULT_IMPORT_REPLACEMENTS[hapifyTemplate]
      .map((templateReplacement) => [
        templateReplacement,
        importPrefixPath + templateReplacement,
      ])
      .concat(
        DEFAULT_SECONDARY_ENTRY_POINTS[hapifyTemplate].map(
          (secondaryEntryPoint) => [
            secondaryEntryPoint,
            `${importPrefixPath}${hapifyTemplate}/${secondaryEntryPoint}`,
          ],
        ),
      )
      .reduce(
        (acc, [importName, importPath]) => ({
          ...acc,
          ...(importName && importPath && { [importName]: importPath }),
        }),
        {},
      );

  // Format entry point inputs
  const defaultEntrypoint =
    DEFAULT_SECONDARY_ENTRY_POINTS[hapifyTemplate] || {};

  const secondaryEntrypoints = [
    ...new Set(
      defaultEntrypoint.concat(...(options.addSecondaryEndpoint || [])),
    ),
  ];

  const targets = DEFAULT_TARGETS_OPTIONS[hapifyTemplate] || {};

  // Process import path if the option is not provided
  const importPath = `@${npmScope}/${directory ? `${directory}-` : ''}${name}`;

  return {
    name,
    directory,
    type,
    hapifyTemplate,
    hapifyModelsJson,
    hapifyUseImportReplacements,
    useSecondaryEndpoint,
    addSecondaryEndpoint,
    npmScope,
    libsDir,
    projectDirectory,
    projectName,
    projectRoot,
    importPath,
    hapifyModelsJsonRelativePath,
    hapifyImportReplacements,
    importPrefixPath: getImportPrefixPath(tree, directory),
    template,
    secondaryEntrypoints,
    targets,
    extra,
  };
}
