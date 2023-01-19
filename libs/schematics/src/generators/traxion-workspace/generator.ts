import { formatFiles, Tree } from '@nrwl/devkit';

import { getLogger, installPackagesTask } from '../../helpers';
import eslintGenerator from '../eslint-config/generator';
import generateWorkflow from '../github-workflows/generator';
import initWorkspaceGenerator from '../init-workspace/generator';
import prettierGenerator from '../prettier-config/generator';
import {
  createAdminApplication,
  createAngularApplication,
  createNestjsApplication,
  createTemplateLibraries,
  normalizeOptions,
} from './helpers';
import { TraxionWorkspaceGeneratorSchema } from './schema';

export default async function traxionWorkspaceGenerator(
  tree: Tree,
  options: TraxionWorkspaceGeneratorSchema,
) {
  const log = getLogger(tree);

  const normalizedOptions = await normalizeOptions(tree, options);
  const { createApps, useConfigs, useGitaction } = normalizedOptions;

  log.info('Update workspace configuration');
  await initWorkspaceGenerator(tree, { skipInstall: true });

  if (useConfigs) {
    log.info('Initializing linter');
    await eslintGenerator(tree, { skipInstall: true });

    log.info('Initializing prettier');
    await prettierGenerator(tree, { format: false, skipInstall: true });
  }

  if (useGitaction) {
    log.info('Initializing github actions');
    await generateWorkflow(tree, { all: true });
  }

  if (createApps) {
    log.warn('Creating applications is disabled for now');

    log.info('Initializing nestjs application');
    await createNestjsApplication(tree, normalizedOptions);

    log.info('Initializing angular application');
    await createAngularApplication(tree, normalizedOptions);

    log.info('Initializing admin application');
    await createAdminApplication(tree, normalizedOptions);
  }

  log.info('Initializing hapify libraries');
  await createTemplateLibraries(tree, normalizedOptions);

  await formatFiles(tree);

  installPackagesTask(tree, normalizedOptions);
}
