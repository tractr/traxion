import {
  formatFiles,
  readProjectConfiguration,
  TargetConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { applicationGenerator as reactApplicationGenerator } from '@nrwl/react';

import { addPackageToPackageJson } from '../..';
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

  const serve: TargetConfiguration | undefined =
    applicationConfiguration.targets?.serve;
  const build: TargetConfiguration | undefined =
    applicationConfiguration.targets?.build;
  // Update application configuration to add proxy config
  updateProjectConfiguration(tree, normalizedOptions.name, {
    ...applicationConfiguration,
    targets: {
      ...applicationConfiguration.targets,
      ...(serve && {
        serve: {
          ...serve,
          options: {
            ...serve.options,
            proxyConfig: `${applicationRoot}/proxy.conf.js`,
          },
        },
      }),
      ...(build && {
        build: {
          ...build,
          options: {
            ...build.options,
            webpackConfig: `${applicationRoot}/webpack.config.cjs`,
          },
        },
      }),
      preserve: {
        configurations: {
          development: {},
          production: {},
        },
        executor: '@nrwl/workspace:run-commands',
        options: {
          commands: [
            'node ./node_modules/.bin/tractr-angular-config-generate ./apps/admin/src/assets/app-config.json',
          ],
          parallel: false,
        },
      },
    },
  });

  await addPackageToPackageJson(tree, ['react-admin', 'rxjs']);

  // Remove application useless files
  cleanApplication(tree, applicationRoot);

  // Add static files to the application
  addFiles(tree, { ...normalizedOptions, applicationRoot });

  // Run format
  await formatFiles(tree);
}
