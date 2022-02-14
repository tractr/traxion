import path = require('path');

import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { addPackageToPackageJson } from '../../helpers';
import hapifyLibraryGenerator from '../hapify-library/generator';
import { normalizeOptions } from '../hapify-library/helpers';
import { NormalizedOptions } from '../hapify-library/schema';
import { NX_TOOLS_NX_PRISMA_PACKAGE } from './constants/nx-tools-prisma-package';
import { getTargetsToAdd } from './helpers/project-targets';
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
    npmScope: options.npmScope,
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
  await hapifyLibraryGenerator(tree, {
    ...options,
    type: 'nest',
    hapifyTemplates: ['prisma'],
  });

  const normalizedOptions = normalizeOptions(tree, options);

  const targetsToAdd = getTargetsToAdd(normalizedOptions);
  const project = readProjectConfiguration(tree, normalizedOptions.projectName);
  project.targets = {
    ...project.targets,
    ...targetsToAdd,
  };
  updateProjectConfiguration(tree, normalizedOptions.projectName, project);

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
  await addPackageToPackageJson(tree, {
    packageName: NX_TOOLS_NX_PRISMA_PACKAGE,
  });
}
