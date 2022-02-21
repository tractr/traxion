import path = require('path');

import { formatFiles, generateFiles, Tree } from '@nrwl/devkit';

import * as packageJson from '../../../package.json';
import { addPackageToPackageJson } from '../../helpers';
import { DEFAULT_LIBRARY_USE_CONTEXT } from '../../schematics.constants';
import addGenerateTarget from '../target-generate/generator';
import {
  addGitIgnoreEntry,
  addImplicitDependencies,
  addTemplateDependencies,
  createSecondaryEntrypoints,
  generateLibrary,
  normalizeOptions,
  updateProjectTargets,
} from './helpers';
import { addBabelRc } from './helpers/add-babelrc.helper';
import {
  HapifyLibraryGeneratorOptionsWithExtra,
  NormalizedOptions,
} from './schema';

function addFiles(host: Tree, options: NormalizedOptions) {
  generateFiles(host, path.join(__dirname, './files'), options.projectRoot, {
    ...options,
    template: '',
    name: options.name,
    templates: options.templates,
    hapifyModelJson: options.hapifyModelsJsonRelativePath,
    hapifyImportReplacements: options.hapifyImportReplacements,
    hapifyUseImportReplacements: options.hapifyUseImportReplacements,
    npmScope: options.npmScope,
  });
}

export default async function hapifyLibraryGenerator(
  tree: Tree,
  options: HapifyLibraryGeneratorOptionsWithExtra,
) {
  // Format options
  const normalizedOptions = normalizeOptions(tree, options);

  const currentVersion = packageJson.version;

  // Default values for library generator options
  const { extra, projectName, hapifyTemplates } = normalizedOptions;

  await generateLibrary(tree, normalizedOptions);

  await createSecondaryEntrypoints(tree, normalizedOptions);

  addFiles(tree, normalizedOptions);

  addGitIgnoreEntry(tree, normalizedOptions);

  await addGenerateTarget(tree, {
    project: projectName,
    ...extra,
  });

  await addPackageToPackageJson(
    tree,
    ['@tractr/hapify-config', ...normalizedOptions.templates].map(
      (packageName) => ({ packageName, version: currentVersion }),
    ),
  );

  addImplicitDependencies(tree, normalizedOptions);

  updateProjectTargets(tree, normalizedOptions);

  const isUsedInAReactContext = hapifyTemplates.some((template) =>
    DEFAULT_LIBRARY_USE_CONTEXT[template].includes('react'),
  );
  if (isUsedInAReactContext) addBabelRc(tree, normalizedOptions);

  await addTemplateDependencies(tree, normalizedOptions);

  await formatFiles(tree);
}
