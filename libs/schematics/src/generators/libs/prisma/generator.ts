import path = require('path');

import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  getImportPath,
  getWorkspaceLayout,
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import {
  getNormalizedProjectDefaultsOptions,
  installPackagesTask,
} from '../../../helpers';
import { traxionVersion } from '../../../versions.constants';
import hapifyLibraryGenerator from '../library/generator';
import { NX_TOOLS_NX_PRISMA_PACKAGE } from './constants/nx-tools-prisma-package';
import { getTargetsToAdd } from './helpers/project-targets';
import { PrismaLibraryGeneratorSchema } from './schema';

export interface NormalizedOptions {
  name: string;
  directory: string;
  projectName: string;
  projectRoot: string;
  nodeModulesRelativePath: string;
  importPrefixPath: string;
  extra: Record<string, unknown>;
}

function normalizeOptions(
  tree: Tree,
  options: PrismaLibraryGeneratorSchema,
): NormalizedOptions {
  const { npmScope } = getWorkspaceLayout(tree);
  const { directory = '' } = options;

  // Format case for user input
  const { name, projectRoot, projectName, projectDirectory } =
    getNormalizedProjectDefaultsOptions(tree, {
      name: options.name,
      directory: options.directory,
    });

  const nodeModulesRelativePath = path.join(
    path.relative(`/${projectRoot}/prisma`, '/'),
    'node_modules',
    '.prisma',
    'client',
  );

  return {
    name,
    directory,
    projectName,
    projectRoot,
    nodeModulesRelativePath,
    importPrefixPath: getImportPath(npmScope, projectDirectory),
    extra: options,
  };
}

function addFiles(host: Tree, options: NormalizedOptions) {
  generateFiles(host, path.join(__dirname, './files'), options.projectRoot, {
    ...options,
    template: '',
  });
}

export default async function prismaLibraryGenerator(
  tree: Tree,
  options: PrismaLibraryGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);
  const { name, projectRoot, projectName, extra } = normalizedOptions;

  await hapifyLibraryGenerator(tree, {
    name,
    type: 'nest',
    hapifyTemplate: 'prisma',
    hapifyAdditionalTemplates: '',
    hapifyModelsJson: 'hapify-models.json',
    hapifyUseImportReplacements: true,
    useSecondaryEndpoint: false,
    addSecondaryEndpoint: [],
    skipInstall: true,
    standalone: true,
    ...extra,
  });

  const targetsToAdd = getTargetsToAdd(projectRoot);
  const project = readProjectConfiguration(tree, projectName);
  project.targets = {
    ...project.targets,
    ...targetsToAdd,
  };
  updateProjectConfiguration(tree, projectName, project);

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  addDependenciesToPackageJson(
    tree,
    {
      '@prisma/client': 'latest',
      '@nestjs/core': 'latest',
      bcrypt: 'latest',
      prisma: 'latest',
      '@tractr/nestjs-database': traxionVersion,
      '@tractr/nestjs-core': traxionVersion,
    },
    {
      [NX_TOOLS_NX_PRISMA_PACKAGE]: 'latest',
    },
  );

  updateJson(tree, 'package.json', (json) => ({
    ...json,
    prisma: {
      ...json.prisma,
      seed: `ts-node -r tsconfig-paths/register --project ${projectRoot}/tsconfig.lib.json ${projectRoot}/prisma/seed.ts`,
      schema: `${projectRoot}/prisma/schema.prisma`,
    },
  }));

  installPackagesTask(tree, options);
}
