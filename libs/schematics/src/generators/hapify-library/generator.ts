import path = require('path');

import { libraryGenerator as angularLibraryGenerator } from '@nrwl/angular/generators';
import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { libraryGenerator as nestLibraryGenerator } from '@nrwl/nest';
import { libraryGenerator as reactLibraryGenerator } from '@nrwl/react';

import { addPackageToPackageJson } from '../..';
import addGenerateTarget from '../target-generate/generator';
import {
  cleanAngularLibrary,
  cleanNestLibrary,
  createSecondaryEntrypoints,
  normalizeOptions,
} from './helpers';
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

function addGitIgnoreEntry(host: Tree, options: NormalizedOptions) {
  const gitIgnorePath = path.join(options.projectRoot, '.gitignore');
  if (!host.exists(gitIgnorePath)) host.write(gitIgnorePath, '');

  let content = host.read(gitIgnorePath, 'utf-8') || '';
  if (!/^hapify.json$/gm.test(content)) {
    content += '\nhapify.json\n';
  }
  if (!/^generated$/gm.test(content)) {
    content += '\ngenerated\n';
  }
  host.write(gitIgnorePath, content);
}

export default async function hapifyLibraryGenerator(
  tree: Tree,
  options: HapifyLibraryGeneratorOptionsWithExtra,
) {
  // Format options
  const normalizedOptions = normalizeOptions(tree, options);

  const currentVersion = (await import('../../../package.json')).version;

  // Default values for library generator options
  const {
    name,
    directory,
    extra,
    type,
    importPath,
    projectName,
    defaultTargetGenerateOptions,
  } = normalizedOptions;
  const libraryGeneratorDefaultOptions = { buildable: true };
  const libraryGeneratorOptions = { name, directory, importPath, ...extra };

  // Generate the library
  switch (type) {
    case 'angular':
      await angularLibraryGenerator(tree, {
        ...libraryGeneratorDefaultOptions,
        ...libraryGeneratorOptions,
      });
      cleanAngularLibrary(tree, normalizedOptions);
      break;
    case 'nest':
      await nestLibraryGenerator(tree, {
        ...libraryGeneratorDefaultOptions,
        ...libraryGeneratorOptions,
      });
      cleanNestLibrary(tree, normalizedOptions);
      break;
    case 'react':
      await reactLibraryGenerator(tree, {
        ...libraryGeneratorDefaultOptions,
        style: 'none',
        skipTsConfig: false,
        skipFormat: false,
        unitTestRunner: 'jest',
        linter: Linter.EsLint,
        ...libraryGeneratorOptions,
      });
      break;
    default:
  }

  await createSecondaryEntrypoints(tree, normalizedOptions);

  addFiles(tree, normalizedOptions);

  addGitIgnoreEntry(tree, normalizedOptions);

  await addGenerateTarget(tree, {
    project: projectName,
    ...extra,
    ...defaultTargetGenerateOptions,
  });

  await addPackageToPackageJson(
    tree,
    ['@tractr/hapify-config', ...normalizedOptions.templates].map(
      (packageName) => ({ packageName, version: currentVersion }),
    ),
  );

  await formatFiles(tree);
}
