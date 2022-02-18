import { join } from 'path';

import {
  addDependenciesToPackageJson,
  generateFiles,
  Tree,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { applicationGenerator as nestjsApplicationGenerator } from '@nrwl/nest';

import {
  addPackageJson,
  addPackageToPackageJson,
  PackageType,
} from '../../../helpers';
import { NormalizedOptions } from '../schema';
import { getTemplatesOptions } from './get-templates-options.helper';

export async function createNestjsApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { apiName, appsDir, npmScope, packageVersion } = options;
  const apiPath = join(appsDir, apiName);

  await nestjsApplicationGenerator(tree, {
    name: apiName,
    linter: Linter.EsLint,
    standaloneConfig: true,
  });
  addPackageJson(
    tree,
    join(apiPath, `package.json`),
    `@${npmScope}/${apiName}`,
  );

  const appPath = join(apiPath, 'src', 'app');

  // delete some files
  tree.delete(join(appPath, 'app.controller.ts'));
  tree.delete(join(appPath, 'app.controller.spec.ts'));
  tree.delete(join(appPath, 'app.service.ts'));
  tree.delete(join(appPath, 'app.service.spec.ts'));

  // Generate the api files
  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'api'),
    join(appsDir, apiName),
    getTemplatesOptions(tree, options),
  );

  await addPackageToPackageJson(
    tree,
    [
      '@tractr/nestjs-authentication',
      '@tractr/nestjs-casl',
      '@tractr/nestjs-core',
      '@tractr/nestjs-database',
    ].map((packageName) => ({
      packageName,
      version: packageVersion,
      type: PackageType.dependencies,
    })),
  );

  await addPackageToPackageJson(
    tree,
    ['@nestjs/swagger', 'morgan', 'swagger-ui-express'].map((packageName) => ({
      packageName,
      type: PackageType.dependencies,
    })),
  );
}
