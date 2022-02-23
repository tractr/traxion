/* eslint-disable no-await-in-loop */

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

import lodash from 'lodash';
import { $, cd } from 'zx';

// $.verbose = false;

const { kebabCase } = lodash;

export interface CreateTraxionWorkspaceOptions
  extends CreateNxWorkspaceOptions {
  apiName?: string;
  pwaName?: string;
  adminName?: string;
  libsPath?: string;
  appsPath?: string;
  generatedDir?: string;
}

export interface CreateNxWorkspaceOptions {
  preset?: string;
  name: string;
  cli?: string;
  style?: string;
  interactive?: boolean;
  packageManager?: string;
  nxCloud?: boolean;
}

const DEFAULT_NX_WORKSPACE_OPTIONS: Partial<CreateNxWorkspaceOptions> = {
  preset: 'ts',
  style: 'less',
  cli: 'nx',
  packageManager: 'npm',
  nxCloud: false,
};

const DEFAULT_TRAXION_WORKSPACE_OPTIONS: Partial<CreateTraxionWorkspaceOptions> =
  {
    ...DEFAULT_NX_WORKSPACE_OPTIONS,
    apiName: 'api',
    pwaName: 'api',
    adminName: 'api',
    libsPath: 'libs',
    appsPath: 'apps',
    generatedDir: 'generated',
  };

export function transformObjectToArgs(
  obj: Record<string, boolean | number | string>,
): Array<string | boolean | number> {
  return Object.entries(obj)
    .map(([key, value]) => [kebabCase(key), value])
    .flatMap(([key, value]) => {
      if (typeof value === 'boolean' && value) return [`--${key}`];
      if (typeof value === 'boolean' && !value) return [`--no-${key}`];
      return [`--${key}`, value];
    });
}

export async function execCreateNxWorkspace(options: CreateNxWorkspaceOptions) {
  const args = transformObjectToArgs({
    ...DEFAULT_NX_WORKSPACE_OPTIONS,
    ...options,
  });

  await $`npx create-nx-workspace ${args}`;
}

export async function writeNpmrc(rootPath: string) {
  await writeFile(
    join(rootPath, '.npmrc'),
    '@tractr:registry=https://npm.pkg.github.com',
  );
}

/**
 * This function is used to create a new Traxion workspace.
 *
 * @params options CreateNxWorkspaceOptions
 */
export async function createTraxionWorkspace(
  options: CreateNxWorkspaceOptions,
) {
  const { name } = options;

  // The entry point of this script is to create a new Nx workspace first.
  // After this we will call the schematics from this stack to paramaeters the workspace
  await execCreateNxWorkspace(options);

  // Change the cwd of the current process to the newly created Nx workspace.
  cd(name);

  await writeNpmrc(cwd());

  const npmPackages = [
    '@tractr/schematics',
    '@nrwl/angular',
    '@nrwl/react',
    '@nrwl/nest',
  ];

  // Installing the missing dependencies
  await $`echo "- Installing missing dependencies"`;
  await $`npm install --save-dev ${npmPackages} &>/dev/null`;
  await $`echo "✔ Installing missing dependencies"`;

  // TODO DO NOT COMMIT THIS LINE
  await $`DEBUG=local-install node ../../stack/tools/local-install.mjs --projects schematics,nestjs-casl,hapify-templates-nestjs-models-rest`;

  const args = transformObjectToArgs({
    ...DEFAULT_TRAXION_WORKSPACE_OPTIONS,
    ...options,
  });
  await $`echo "- Start traxion workspace schematics"`;
  await $`nx g @tractr/schematics:traxion-workspace ${args}`;
  await $`echo "✔ Start traxion workspace schematics"`;

  await $`echo "- Installing missing dependencies"`;
  await $`npm install --force &>/dev/null`;
  await $`echo "✔ Installing missing dependencies"`;

  await $`echo "- Formating the workspace"`;
  await $`npm run format &>/dev/null`;
  await $`echo "✔ Formating the workspace"`;

  // TODO DO NOT COMMIT THIS LINE
  await $`DEBUG=local-install node ../../stack/tools/local-install.mjs --projects schematics,nestjs-casl,hapify-templates-nestjs-models-rest`;
}
