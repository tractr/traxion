import { join } from 'path';

import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';

import { addPackageJson, installPackagesTask } from '../../../../helpers';
import { traxionVersion } from '../../../../versions.constants';
import { NormalizedOptions } from '../schema';

export async function updatePackageJson(
  tree: Tree,
  normalizedOptions: NormalizedOptions,
) {
  const { name, appsDir, npmScope } = normalizedOptions;
  const apiPath = join(appsDir, name);

  addPackageJson(tree, join(apiPath, `package.json`), `@${npmScope}/${name}`);

  addDependenciesToPackageJson(
    tree,
    [
      '@tractr/nestjs-authentication',
      '@tractr/nestjs-casl',
      '@tractr/nestjs-core',
      '@tractr/nestjs-database',
    ].reduce<Record<string, string>>((acc, packageName) => {
      acc[packageName] = traxionVersion;
      return acc;
    }, {}),
    {},
  );

  addDependenciesToPackageJson(
    tree,
    [
      '@nestjs/swagger',
      'morgan',
      'swagger-ui-express',
      'cookie-parser',
      'graphql',
      'passport',
      '@casl/prisma',
    ].reduce<Record<string, string>>((acc, packageName) => {
      acc[packageName] = 'latest';
      return acc;
    }, {}),
    {},
  );

  installPackagesTask(tree, normalizedOptions);
}
