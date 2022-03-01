import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import * as packageJson from '../../../../package.json';
import {
  addPackageJson,
  addPackageToPackageJson,
  PackageDefinition,
  PackageType,
} from '../../../helpers';
import { NormalizedOptions } from '../schema';

export async function updatePackageJson(
  tree: Tree,
  normalizedOptions: NormalizedOptions,
) {
  const { appsDir, npmScope, name } = normalizedOptions;

  addPackageJson(
    tree,
    join(appsDir, name, `package.json`),
    `@${npmScope}/${name}`,
  );

  await addPackageToPackageJson(
    tree,
    [
      '@angular/core',
      '@tailwindcss/forms',
      '@angular/common',
      '@angular/core',
      '@angular/platform-browser',
      '@ant-design/icons-angular',
      '@prisma/client',
      'ng-zorro-antd',
    ],
    PackageType.dependencies,
  );

  await addPackageToPackageJson(
    tree,
    [
      '@tractr/angular-authentication',
      '@tractr/angular-casl',
      '@tractr/angular-config',
      '@tractr/angular-tools',
      '@tractr/common',
    ].map((packageName) => ({
      packageName,
      version: packageJson.version,
      type: PackageType.dependencies,
    })),
  );

  // Fix angular dependencies cause a bug to use the demo
  await addPackageToPackageJson(
    tree,
    [
      '@angular/animations',
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/forms',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
    ]
      .map<string | PackageDefinition>((packageName) => ({
        packageName,
        version: '13.2.1',
      }))
      .concat(['tailwind', '@tailwindcss/forms']),
    PackageType.dependencies,
  );
  await addPackageToPackageJson(
    tree,
    [
      '@angular-devkit/build-angular',
      '@angular/cli',
      '@angular/compiler-cli',
      '@angular/language-service',
    ].map((packageName) => ({ packageName, version: '13.2.1' })),
    PackageType.devDependencies,
  );
}
