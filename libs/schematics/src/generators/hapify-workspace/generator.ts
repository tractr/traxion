/* eslint-disable no-await-in-loop */
import * as path from 'path';

import { applicationGenerator as angularApplicationGenerator } from '@nrwl/angular/generators';
import { E2eTestRunner } from '@nrwl/angular/src/utils/test-runners';
import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  logger,
  names,
  readWorkspaceConfiguration,
  Tree,
  updateJson,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { applicationGenerator as nestjsApplicationGenerator } from '@nrwl/nest';
import { v4 as uuid4 } from 'uuid';

import { addPackageJson } from '../../helpers';
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
import prismaLibraryGenerator from '../prisma-library/generator';
import { addNpmrc } from './helpers';
import { HapifyWorkspaceGeneratorSchema } from './schema';

interface NormalizedSchema extends HapifyWorkspaceGeneratorSchema {
  npmScope: string;
  appsDir: string;
  libsDir: string;
  uuid4: string;
  workspaceName: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: HapifyWorkspaceGeneratorSchema,
): NormalizedSchema {
  const { libsDir, appsDir, npmScope } = getWorkspaceLayout(tree);
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    npmScope,
    appsDir,
    libsDir,
    workspaceName: options.name,
    parsedTags,
    uuid4: uuid4(),
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    template: '',
  };
  generateFiles(tree, path.join(__dirname, 'files'), '', templateOptions);
}

export default async function hapifyWorkspace(
  tree: Tree,
  options: HapifyWorkspaceGeneratorSchema,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isVerbose } = tree as any;

  const log = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    info: isVerbose ? logger.debug : () => {},
    error: logger.error,
  };
  // We add to the workspace a npmrc file
  log.info('Adding .npmrc file');
  addNpmrc(tree);

  log.info('Update workspace configuration');
  const workspaceConfiguration = readWorkspaceConfiguration(tree);

  updateWorkspaceConfiguration(tree, {
    ...workspaceConfiguration,
    workspaceLayout: {
      appsDir: 'apps',
      libsDir: 'libs',
    },
  });

  const normalizedOptions = normalizeOptions(tree, options);
  const { appsDir, npmScope } = normalizedOptions;

  log.info('Initializing linter');
  await eslintGenerator(tree);

  log.info('Initializing prettier');
  await prettierGenerator(tree, { format: false });

  log.info('Initializing github actions');
  await generateWorkflow(tree, { all: true });

  log.info('Initializing nestjs application');
  await nestjsApplicationGenerator(tree, {
    name: 'api',
    linter: Linter.EsLint,
    standaloneConfig: true,
  });
  addPackageJson(tree, `${appsDir}/api/package.json`, `@${npmScope}/api`);

  log.info('Initializing angular application');
  await angularApplicationGenerator(tree, {
    name: 'pwa',
    linter: Linter.EsLint,
    standaloneConfig: true,
    addTailwind: true,
    backendProject: 'api',
    strict: true,
    style: 'less',
    e2eTestRunner: E2eTestRunner.None,
  });
  addPackageJson(tree, `${appsDir}/pwa/package.json`, `@${npmScope}/pwa`);

  log.info('Initializing admin application');
  await adminGenerator(tree, {
    name: 'admin',
    reactAdminImportPath: '@generated/react-admin',
    rextClientImportPath: '@generated/rext-client',
  });

  log.info('Initializing hapify libraries');
  for (const [libraryName, type] of Object.entries(DEFAULT_LIBRARY_TYPE)) {
    if (libraryName === 'prisma') {
      await prismaLibraryGenerator(tree, {
        name: libraryName,
        directory: 'generated',
      });
    } else {
      await hapifyLibraryGenerator(tree, {
        useSecondaryEndpoint: true,
        addSecondaryEndpoint: [],
        hapifyAdditionalTemplates: '',
        hapifyModelsJson: 'hapify-models.json',
        hapifyTemplates: [libraryName as AvailableTractrTemplates],
        type: type as AvailableLibraryType,
        hapifyUseImportReplacements: true,
        name: libraryName,
        directory: 'generated',
      });
    }
  }

  log.info('Add files to the workspace');
  addFiles(tree, normalizedOptions);

  log.info('Update package.json scripts');
  updateJson(tree, 'package.json', (json) => ({
    ...json,
    scripts: {
      build: 'nx run-many --all --target=build',
      format: 'nx format:write --all',
      generate: 'npx nx run-many --target generate --all',
      postinstall:
        '(is-ci || husky install) && ngcc --properties es2015 browser module main',
      lint: 'nx workspace-lint && nx run-many --all --target=lint --parallel',
      nx: 'nx',
      test: ' nx run-many --all --target=test',
      'hpf:serve': 'hpf serve --depth 5',
      ...json.scripts,
    },
  }));

  tree.delete('packages');

  await formatFiles(tree);
}
