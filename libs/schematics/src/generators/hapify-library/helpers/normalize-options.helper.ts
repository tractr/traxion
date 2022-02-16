import { relative } from 'path';

import { getWorkspaceLayout, Tree } from '@nrwl/devkit';

import { getNormalizedProjectDefaultsOptions } from '../../../helpers';
import {
  DEFAULT_IMPORT_REPLACEMENTS,
  DEFAULT_SECONDARY_ENTRY_POINTS,
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
    hapifyTemplates,
    hapifyAdditionalTemplates,
    hapifyModelsJson,
    hapifyUseImportReplacements,
    useSecondaryEndpoint,
    addSecondaryEndpoint,
    ...extra
  } = options;

  // Fetch workspace data
  const { npmScope } = getWorkspaceLayout(tree);

  const { name, directory, projectDirectory, projectRoot, projectName } =
    getNormalizedProjectDefaultsOptions(tree, {
      name: rawName,
      directory: rawDirectory,
    });

  // Format hapify template inputs
  const templates =
    hapifyTemplates
      .map((template) => `@tractr/hapify-templates-${template}`)
      .concat(...options.hapifyAdditionalTemplates.split(','))
      .filter((template) => template !== '') || [];

  // Format hapify model path
  const hapifyModelsJsonRelativePath = relative(
    projectRoot,
    options.hapifyModelsJson,
  );

  // Format import replacement
  const hapifyImportReplacements = [
    ...new Set(
      hapifyTemplates.flatMap(
        (template) => DEFAULT_IMPORT_REPLACEMENTS[template],
      ),
    ),
  ];

  // Format entry point inputs
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

  // Process import path if the option is not provided
  const importPath = `${npmScope}/${directory ? `${directory}-` : ''}${name}`;

  return {
    name,
    directory,
    type,
    hapifyTemplates,
    hapifyAdditionalTemplates,
    hapifyModelsJson,
    hapifyUseImportReplacements,
    useSecondaryEndpoint,
    addSecondaryEndpoint,
    npmScope,
    projectDirectory,
    projectName,
    projectRoot,
    importPath,
    hapifyModelsJsonRelativePath,
    hapifyImportReplacements,
    templates,
    secondaryEntrypoints,
    extra,
  };
}
