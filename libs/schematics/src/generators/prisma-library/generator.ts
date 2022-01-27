import path = require('path');

import { formatFiles, generateFiles, Tree } from '@nrwl/devkit';

import libraryGenerator from '../library/generator';
import { normalizeOptions } from '../library/helpers';
import { NormalizedOptions } from '../library/schema';
import { PrismaLibraryGeneratorSchema } from './schema';

function getNodeModulesRelativePath(
  hostRoot: string,
  projectRoot: string,
): string {
  return path.join(
    path.relative(`${projectRoot}/prisma/schemas`, hostRoot),
    'node_modules',
  );
}

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
    nodeModuleRelativePath: getNodeModulesRelativePath(
      host.root,
      options.projectRoot,
    ),
  });
}

export default async function prismaLibraryGenerator(
  tree: Tree,
  options: PrismaLibraryGeneratorSchema,
) {
  await libraryGenerator(tree, {
    ...options,
    type: 'nest',
    hapifyTemplates: ['prisma'],
  });

  const normalizedOptions = normalizeOptions(tree, options);

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
