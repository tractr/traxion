import {
  formatFiles,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { applicationGenerator as reactApplicationGenerator } from '@nrwl/react';

import { addFiles, cleanApplication, normalizeOptions } from './helpers';
import { AdminAppGeneratorSchema } from './schema';

/**
 * Generate an application to host a react-admin application
 *
 * @param tree - File tree
 * @param options - User options
 */
export default async function adminGenerator(
  tree: Tree,
  options: AdminAppGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);

  // Generate admin application
  await reactApplicationGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.directory,
    style: 'none',
    skipFormat: false,
    unitTestRunner: 'jest',
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    // allow extra options to override default values for the react schematic
    ...normalizedOptions.extra,
  });

  // Get application configuration
  const applicationConfiguration = readProjectConfiguration(
    tree,
    normalizedOptions.name,
  );
  const applicationRoot = applicationConfiguration.root;

  // Update application configuration to add proxy config
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  applicationConfiguration.targets!.serve.options.proxyConfig = `${applicationRoot}/proxy.conf.js`;
  updateProjectConfiguration(
    tree,
    normalizedOptions.name,
    applicationConfiguration,
  );

  // Remove application useless files
  cleanApplication(tree, applicationRoot);

  // Add static files to the application
  addFiles(tree, { ...normalizedOptions, applicationRoot });

  // Run format
  await formatFiles(tree);
}
