/* eslint-disable no-await-in-loop */
import * as path from 'path';

import {
  applicationGenerator as angularApplicationGenerator,
  libraryGenerator,
} from '@nrwl/angular/generators';
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import { applicationGenerator as nestjsApplicationGenerator } from '@nrwl/nest';

import { DEFAULT_LIBRARY_TYPE } from '../../schematics.constants';
import adminGenerator from '../admin-app/generator';
import eslintGenerator from '../eslint-config/generator';
import generateWorkflow from '../github-workflows/generator';
import hapifyLibraryGenerator from '../hapify-library/generator';
import {
  AvailableLibraryType,
  AvailableTractrTemplates,
} from '../hapify-library/schema';
import prettierGenerator from '../prettier-config/generator';
import { addNpmrc } from './helpers';
import { HapifyWorkspaceGeneratorSchema } from './schema';

interface NormalizedSchema extends HapifyWorkspaceGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: HapifyWorkspaceGeneratorSchema,
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
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
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions,
  );
}

export default async function hapifyWorkspace(
  tree: Tree,
  options: HapifyWorkspaceGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);

  // We add to the workspace a npmrc file
  addNpmrc(tree);

  // First we call the nestjs application generator
  await nestjsApplicationGenerator(tree, normalizedOptions);

  // Then we call the angular application generator
  await angularApplicationGenerator(tree, normalizedOptions);

  await adminGenerator(tree, {
    name: 'admin',
    reactAdminImportPath: '@generated/react-admin',
    rextClientImportPath: '@generated/rext-client',
  });

  // Installing
  for (const [libraryName, type] of Object.entries(DEFAULT_LIBRARY_TYPE)) {
    // Then we call the admin app generator
    await hapifyLibraryGenerator(tree, {
      useSecondaryEndpoint: true,
      addSecondaryEndpoint: [],
      hapifyAdditionalTemplates: '',
      hapifyModelsJson: 'hapify-models.json',
      hapifyTemplates: [libraryName as AvailableTractrTemplates],
      type: type as AvailableLibraryType,
      hapifyUseImportReplacements: true,
      name: libraryName,
    });
  }

  await eslintGenerator(tree);

  await prettierGenerator(tree, { format: true });

  await generateWorkflow(tree, { all: true });

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);
}
