import { relative } from 'path';

import { getImportPath, getWorkspaceLayout, Tree } from '@nrwl/devkit';

import { getNormalizedProjectDefaultsOptions } from '../../../../helpers';
import {
  DEFAULT_LIBRARY_TYPE,
  DEFAULT_SECONDARY_ENTRY_POINTS,
  DEFAULT_TRAXION_DIRECTORY,
  DEFAULT_TRAXION_NAME,
  DEFAULT_TRAXION_PACKAGES_DEPS,
} from '../../../../schematics.constants';
import {
  HapifyLibraryGeneratorOptionsWithExtra,
  NormalizedOptions,
} from '../schema';

/**
 * Normalize the options from the cli to run correctly this generator
 */
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
    standalone,
    ...extra
  } = options;

  // Get workspace data
  const { libsDir, npmScope } = getWorkspaceLayout(tree);

  const { name, directory, projectDirectory, projectRoot, projectName } =
    getNormalizedProjectDefaultsOptions(tree, {
      name: rawName || DEFAULT_TRAXION_NAME[hapifyTemplate],
      directory: rawDirectory || DEFAULT_TRAXION_DIRECTORY[hapifyTemplate],
    });

  // Format hapify template inputs
  const template = `@tractr/hapify-templates-${hapifyTemplate}`;

  // Format hapify model path
  const hapifyModelsJsonRelativePath = relative(
    projectRoot,
    options.hapifyModelsJson,
  );

  const importPrefixPath = getImportPath(npmScope, projectDirectory);

  // Format import replacement
  const hapifyImportReplacements: Record<string, string> =
    DEFAULT_TRAXION_PACKAGES_DEPS[hapifyTemplate]
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

  // Process import path if the option is not provided
  const importPath = `@${npmScope}/${directory ? `${directory}-` : ''}${name}`;

  return {
    name,
    directory,
    type: type || DEFAULT_LIBRARY_TYPE[hapifyTemplate] || 'ts',
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
    importPrefixPath: `@${npmScope}/`,
    template,
    secondaryEntrypoints,
    standalone,
    extra,
  };
}
