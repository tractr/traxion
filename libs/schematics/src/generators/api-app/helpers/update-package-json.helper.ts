import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import * as packageJson from '../../../../package.json';
import {
  addPackageJson,
  addPackageToPackageJson,
  installPackagesTask,
  PackageType,
} from '../../../helpers';
import { NormalizedOptions } from '../schema';

export async function updatePackageJson(
  tree: Tree,
  normalizedOptions: NormalizedOptions,
) {
  const { name, appsDir, npmScope } = normalizedOptions;
  const apiPath = join(appsDir, name);

  addPackageJson(tree, join(apiPath, `package.json`), `@${npmScope}/${name}`);

  await addPackageToPackageJson(
    tree,
    [
      '@tractr/nestjs-authentication',
      '@tractr/nestjs-casl',
      '@tractr/nestjs-core',
      '@tractr/nestjs-database',
    ].map((packageName) => ({
      packageName,
      version: packageJson.version,
      type: PackageType.dependencies,
    })),
  );

  await addPackageToPackageJson(
    tree,
    [
      '@nestjs/swagger',
      'morgan',
      'swagger-ui-express',
      'cookie-parser',
      'graphql',
      '@casl/prisma',
    ],
    PackageType.dependencies,
  );

  installPackagesTask(tree, normalizedOptions);
}
