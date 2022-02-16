import path = require('path');

import { libraryGenerator as angularLibraryGenerator } from '@nrwl/angular/generators';
import { formatFiles, generateFiles, Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { libraryGenerator as nestLibraryGenerator } from '@nrwl/nest';
import { libraryGenerator as reactLibraryGenerator } from '@nrwl/react';
import * as deepmerge from 'deepmerge';

import { addPackageToPackageJson } from '../..';
import { readTargetConfiguration } from '../../helpers/read-target-configuration';
import { updateTargetConfiguration } from '../../helpers/update-target-configuration';
import addGenerateTarget from '../target-generate/generator';
import {
  cleanAngularLibrary,
  cleanNestLibrary,
  createSecondaryEntrypoints,
  normalizeOptions,
} from './helpers';
import { cleanReactLibrary } from './helpers/clean-react-library.helper';
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
  const { name, directory, extra, type, targets, importPath, projectName } =
    normalizedOptions;
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
      cleanReactLibrary(tree, normalizedOptions);
      break;
    default:
  }

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

  Object.keys(targets).forEach((target) => {
    const targetConfiguration = readTargetConfiguration(
      tree,
      projectName,
      target,
    );
    updateTargetConfiguration(
      tree,
      projectName,
      target,
      deepmerge(targetConfiguration, targets[target]),
    );
  });

  await formatFiles(tree);
}
