import { join } from 'path';

import {
  formatFiles,
  getWorkspaceLayout,
  readProjectConfiguration,
  TargetConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { applicationGenerator as reactApplicationGenerator } from '@nrwl/react';

import {
  addPackageToPackageJson,
  installPackagesTask,
  PackageType,
} from '../../helpers';
import { addFiles, cleanApplication, normalizeOptions } from './helpers';
import { AdminAppGeneratorSchemaWithExtra } from './schema';

/**
 * Generate an application to host a react-admin application
 *
 * @param tree - File tree
 * @param options - User options
 */
export default async function adminGenerator(
  tree: Tree,
  options: AdminAppGeneratorSchemaWithExtra,
) {
  const normalizedOptions = normalizeOptions(tree, options);
  const { name, directory, projectRoot, extra } = normalizedOptions;
  const { appsDir } = getWorkspaceLayout(tree);

  // Generate admin application
  await reactApplicationGenerator(tree, {
    name,
    directory,
    style: 'none',
    skipFormat: false,
    unitTestRunner: 'jest',
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    // allow extra options to override default values for the react schematic
    ...extra,
  });

  // Get application configuration
  const applicationConfiguration = readProjectConfiguration(tree, name);
  const applicationRoot = applicationConfiguration.root;

  const serve: TargetConfiguration | undefined =
    applicationConfiguration.targets?.serve;
  const build: TargetConfiguration | undefined =
    applicationConfiguration.targets?.build;
  // Update application configuration to add proxy config
  updateProjectConfiguration(tree, name, {
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
          dependsOn: [
            {
              projects: 'self',
              target: 'preserve',
            },
          ],
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
            `npx tractr-angular-config-generate ./${appsDir}/${name}/src/assets/app-config.json`,
          ],
          parallel: false,
        },
      },
    },
  });

  await addPackageToPackageJson(
    tree,
    [
      'react-admin',
      'rxjs',
      'class-validator',
      'ra-core',
      { packageName: 'react-router-dom', version: '^5.1.0' },
      { packageName: 'react-router', version: '^5.1.0' },
    ],
    PackageType.dependencies,
  );

  // Remove application useless files
  cleanApplication(tree, applicationRoot);

  // Add static files to the application
  addFiles(tree, { ...normalizedOptions, applicationRoot });

  updateJson(tree, join(projectRoot, 'tsconfig.json'), (json) => ({
    ...json,
    compilerOptions: {
      ...json.compilerOptions,
      noPropertyAccessFromIndexSignature: false,
    },
  }));

  installPackagesTask(tree, normalizedOptions);

  // Run format
  await formatFiles(tree);
}
