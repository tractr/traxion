import path = require('path');

import { libraryGenerator as angularLibraryGenerator } from '@nrwl/angular/generators';
import { formatFiles, generateFiles, Tree } from '@nrwl/devkit';
import { libraryGenerator as nestLibraryGenerator } from '@nrwl/nest';

import { normalizeGeneratorOptions, normalizeOptions } from './helpers';
import {
  AngularLibraryGeneratorOptions,
  LibraryGeneratorOptions,
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
    npmScope: options.prefix,
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

export default async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorOptions,
) {
  const { type } = options;
  const generatorOptions = normalizeGeneratorOptions(options);

  if (type === 'angular')
    await angularLibraryGenerator(
      tree,
      generatorOptions as AngularLibraryGeneratorOptions,
    );
  else if (type === 'nest') await nestLibraryGenerator(tree, generatorOptions);

  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  addGitIgnoreEntry(tree, normalizedOptions);

  await formatFiles(tree);
}
