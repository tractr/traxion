import * as path from 'path';

import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';

import libraryGenerator from '../library/generator';
import { PrismaLibraryGeneratorSchema } from './schema';

interface NormalizedSchema extends PrismaLibraryGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: PrismaLibraryGeneratorSchema,
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(/\//g, '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, './files'),
    options.projectRoot,
    templateOptions,
  );
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
