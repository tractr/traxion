import { join } from 'path';

import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';

import { addPackageJson, installPackagesTask } from '../../../../helpers';
import { traxionVersion } from '../../../../versions.constants';
import { NormalizedOptions } from '../schema';

export function updatePackageJson(
  tree: Tree,
  normalizedOptions: NormalizedOptions,
) {
  const { appsDir, npmScope, name } = normalizedOptions;

  addPackageJson(
    tree,
    join(appsDir, name, `package.json`),
    `@${npmScope}/${name}`,
  );

  addDependenciesToPackageJson(
    tree,
    {
      '@tailwindcss/forms': 'latest',
      '@ant-design/icons-angular': 'latest',
      '@prisma/client': 'latest',
      'ng-zorro-antd': 'latest',

      '@angular/animations': 'latest',
      '@angular/common': 'latest',
      '@angular/compiler': 'latest',
      '@angular/core': 'latest',
      '@angular/forms': 'latest',
      '@angular/platform-browser': 'latest',
      '@angular/platform-browser-dynamic': 'latest',
      '@angular/router': 'latest',

      '@tractr/angular-authentication': traxionVersion,
      '@tractr/angular-casl': traxionVersion,
      '@tractr/angular-config': traxionVersion,
      '@tractr/angular-tools': traxionVersion,
      '@tractr/common': traxionVersion,
    },
    {
      '@angular-devkit/build-angular': 'latest',
      '@angular/cli': 'latest',
      '@angular/compiler-cli': 'latest',
      '@angular/language-service': 'latest',
    },
  );

  installPackagesTask(tree, normalizedOptions);
}
