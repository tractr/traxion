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
  const { libsDir, npmScope } = getWorkspaceLayout(tree);

  // Format case for user input
  const name = names(rawName).fileName;
  const directory = rawDirectory ? names(rawDirectory).fileName : undefined;

  // Process project data from user input
  const projectDirectory = directory ? `${directory}/${name}` : name;
  const projectName = projectDirectory.replace(/\//g, '-');
  const projectRoot = joinPathFragments(libsDir, projectDirectory);

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
