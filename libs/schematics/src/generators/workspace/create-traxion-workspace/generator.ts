/* eslint-disable no-await-in-loop */

import { formatFiles, logger, Tree } from '@nrwl/devkit';

import { installPackagesTask } from '../../../helpers/install-packages-task.helper';
import eslintGenerator from '../../configs/eslint/generator';
import generateWorkflow from '../../configs/github-workflows/generator';
import prettierGenerator from '../../configs/prettier/generator';
import initWorkspaceGenerator from '../initialize-nx-workspace/generator';
import {
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

  succeed = log.info('Update workspace configuration');
  await initWorkspaceGenerator(tree, {
    skipInstall: false,
    appsDir: 'apps',
    libsDir: 'libs',
  });
  succeed();

  const normalizedOptions = await normalizeOptions(tree, options);

  succeed = log.info('Initializing linter');
  await eslintGenerator(tree);
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
  await createTemplateLibraries(tree);
  succeed();

  succeed = log.info('Add files to the workspace');
  await addWorkspaceFiles(tree, normalizedOptions);
  succeed();

  await formatFiles(tree);

  installPackagesTask(tree, normalizedOptions);
}
