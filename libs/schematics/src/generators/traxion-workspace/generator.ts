import { formatFiles, logger, Tree } from '@nrwl/devkit';

import { installPackagesTask } from '../..';
import eslintGenerator from '../eslint-config/generator';
import generateWorkflow from '../github-workflows/generator';
import initWorkspaceGenerator from '../init-workspace/generator';
import prettierGenerator from '../prettier-config/generator';
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
    info: (message: string) => {
      if (isVerbose) logger.debug(`- ${message}`);
      return isVerbose ? showSucceed(message) : () => undefined;
    },
    error: logger.error,
  };

  let succeed;

  succeed = log.info('Update workspace configuration');
  await initWorkspaceGenerator(tree);
  succeed();

  const normalizedOptions = await normalizeOptions(tree, options);
  const { useConfigs, useGitaction } = normalizedOptions;

  if (useConfigs) {
    succeed = log.info('Initializing linter');
    await eslintGenerator(tree, { skipInstall: true });
    succeed();

    succeed = log.info('Initializing prettier');
    await prettierGenerator(tree, { format: false, skipInstall: true });
    succeed();
  }

  if (useGitaction) {
    succeed = log.info('Initializing github actions');
    await generateWorkflow(tree, { all: true });
    succeed();
  }

  // succeed = log.info('Initializing nestjs application');
  // await createNestjsApplication(tree, normalizedOptions);
  // succeed();

  // succeed = log.info('Initializing angular application');
  // await createAngularApplication(tree, normalizedOptions);
  // succeed();

  // succeed = log.info('Initializing admin application');
  // await createAdminApplication(tree, normalizedOptions);
  // succeed();

  succeed = log.info('Initializing hapify libraries');
  await createTemplateLibraries(tree, normalizedOptions);
  succeed();

  succeed = log.info('Add files to the workspace');
  await addWorkspaceFiles(tree, normalizedOptions);
  succeed();

  await formatFiles(tree);

  installPackagesTask(tree, normalizedOptions);
}
