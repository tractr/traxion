import { join } from 'path';

import { applicationGenerator as angularApplicationGenerator } from '@nrwl/angular/generators';
import { E2eTestRunner } from '@nrwl/angular/src/utils/test-runners';
import { generateFiles, Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';

import * as packageJson from '../../../../package.json';
import {
  addPackageJson,
  addPackageToPackageJson,
  PackageDefinition,
  PackageType,
  readTargetConfiguration,
  updateTargetConfiguration,
} from '../../../helpers';
import { NormalizedOptions } from '../schema';
import { getTemplatesOptions } from './get-templates-options.helper';

export async function createAngularApplication(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { apiName, appsDir, npmScope, pwaName } = options;

  await angularApplicationGenerator(tree, {
    name: pwaName,
    linter: Linter.EsLint,
    standaloneConfig: true,
    addTailwind: true,
    backendProject: apiName,
    strict: true,
    style: 'less',
    e2eTestRunner: E2eTestRunner.None,
  });

  addPackageJson(
    tree,
    join(appsDir, pwaName, `package.json`),
    `@${npmScope}/${pwaName}`,
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

  const pwaPath = join(appsDir, pwaName);
  const appPath = join(pwaPath, 'src', 'app');

  // delete some files
  tree.delete(join(appPath, 'app.component.html'));
  tree.delete(join(appPath, 'app.component.less'));
  tree.delete(join(appPath, 'app.component.spec.ts'));
  tree.delete(join(appPath, 'app.component.ts'));
  tree.delete(join(appPath, 'nx-welcome.component.ts'));

  // Generate the pwa files
  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'pwa'),
    join(appsDir, pwaName),
    getTemplatesOptions(tree, options),
  );

  updateTargetConfiguration(tree, pwaName, 'preserve', {
    configurations: {
      development: {},
      production: {},
    },
    executor: '@nrwl/workspace:run-commands',
    options: {
      commands: [
        'npx tractr-angular-config-generate ./apps/pwa/src/assets/app-config.json',
      ],
      parallel: false,
    },
  });

  const serve = readTargetConfiguration(tree, pwaName, 'serve');
  updateTargetConfiguration(tree, pwaName, 'serve', {
    ...serve,
    dependsOn: [
      {
        projects: 'self',
        target: 'preserve',
      },
    ],
  });

  const build = readTargetConfiguration(tree, pwaName, 'build');
  updateTargetConfiguration(tree, pwaName, 'build', {
    ...build,
    options: {
      ...build.options,
      styles: [
        ...build.options.styles,
        'node_modules/ng-zorro-antd/ng-zorro-antd.min.css',
      ],
      allowedCommonJsDependencies: [
        'validator',
        '@prisma/client',
        '@tractr/common',
      ],
    },
  });

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

  // Update polyfill eslint error
  const polyfill = (
    tree.read(join(pwaPath, 'src', 'polyfill.ts')) || ''
  ).toString();

  tree.write(
    join(pwaPath, 'src', 'polyfill.ts'),
    polyfill.replaceAll(/\/\*\*\*.*/g, '/**'),
  );
}
