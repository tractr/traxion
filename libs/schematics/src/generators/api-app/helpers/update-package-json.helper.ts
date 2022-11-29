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
      '@trxn/nestjs-authentication',
      '@trxn/nestjs-casl',
      '@trxn/nestjs-core',
      '@trxn/nestjs-database',
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
      'passport',
      '@casl/prisma',
    ],
    PackageType.dependencies,
  );

  installPackagesTask(tree, normalizedOptions);
}
