/* eslint-disable no-await-in-loop */

import {
  formatFiles,
  logger,
  readWorkspaceConfiguration,
  Tree,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';

import { addPackageToPackageJson, PackageType } from '../../helpers';
import eslintGenerator from '../eslint-config/generator';
import generateWorkflow from '../github-workflows/generator';
import prettierGenerator from '../prettier-config/generator';
import {
  addNpmrc,
  addWorkspaceFiles,
  createAdminApplication,
  createAngularApplication,
  createNestjsApplication,
  createTemplateLibraries,
  normalizeOptions,
} from './helpers';
import { TraxionWorkspaceGeneratorSchema } from './schema';

function showSucceed(message: string | null) {
  return () => {
    logger.debug(`✔ ${message}`);
  };
}

export default async function traxionWorkspaceGenerator(
  tree: Tree,
  options: TraxionWorkspaceGeneratorSchema,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isVerbose } = tree as any;

  const log = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    info: (message: string) => {
      if (isVerbose) logger.debug(`- ${message}`);
      return isVerbose ? showSucceed(message) : () => undefined;
    },
    error: logger.error,
  };

  let succeed;

  // We add to the workspace a npmrc file
  succeed = log.info('Adding .npmrc file');
  addNpmrc(tree);
  succeed();

  succeed = log.info('Update workspace configuration');
  const workspaceConfiguration = readWorkspaceConfiguration(tree);
  succeed();

  updateWorkspaceConfiguration(tree, {
    ...workspaceConfiguration,
    workspaceLayout: {
      appsDir: 'apps',
      libsDir: 'libs',
    },
  });

  const normalizedOptions = await normalizeOptions(tree, options);
  const { generatedDir } = normalizedOptions;

  succeed = log.info('Initializing linter');
  await eslintGenerator(tree, { generatedDir });
  succeed();

  succeed = log.info('Initializing prettier');
  await prettierGenerator(tree, { format: false });
  succeed();

  succeed = log.info('Initializing github actions');
  await generateWorkflow(tree, { all: true });
  succeed();

  succeed = log.info('Initializing nestjs application');
  await createNestjsApplication(tree, normalizedOptions);
  succeed();

  succeed = log.info('Initializing angular application');
  await createAngularApplication(tree, normalizedOptions);
  succeed();

  succeed = log.info('Initializing admin application');
  await createAdminApplication(tree, normalizedOptions);
  succeed();

  succeed = log.info('Initializing hapify libraries');
  await createTemplateLibraries(tree, normalizedOptions);
  succeed();

  succeed = log.info('Add files to the workspace');
  await addWorkspaceFiles(tree, normalizedOptions);
  succeed();

  await formatFiles(tree);
}
