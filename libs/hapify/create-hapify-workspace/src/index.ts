/* eslint-disable no-await-in-loop */

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

import lodash from 'lodash';
import { $, cd } from 'zx';

const { kebabCase } = lodash;

export interface CreateHapifyWorkspaceOptions {
  hapifyLibraryName: string;
}

export interface CreateNxWorkspaceOptions {
  preset?: string;
  name?: string;
  appName?: string;
  cli?: string;
  style?: string;
  interactive?: boolean;
  packageManager?: string;
  nxCloud?: boolean;
}

const DEFAULT_NX_WORKSPACE_OPTIONS: CreateNxWorkspaceOptions = {
  preset: 'ts',
  appName: 'api',
  style: 'less',
  cli: 'nx',
  packageManager: 'npm',
  nxCloud: false,
};

export async function execCreateNxWorkspace(
  options: CreateNxWorkspaceOptions = {},
) {
  const args = Object.entries({
    ...DEFAULT_NX_WORKSPACE_OPTIONS,
    ...options,
  })
    .map(([key, value]) => [kebabCase(key), value])
    .flatMap(([key, value]) => {
      if (typeof value === 'boolean' && value) return [`--${key}`];
      if (typeof value === 'boolean' && !value) return [`--no-${key}`];
      return [`--${key}`, value];
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
 * This function is used to create a new Hapify workspace.
 *
 * @params options CreateNxWorkspaceOptions
 */
export async function createHapifyWorkspace(
  options: CreateNxWorkspaceOptions = {},
) {
  const appName = 'test1';

  // The entry point of this script is to create a new Nx workspace first.
  // After this we will call the schematics from this stack to paramaeters the workspace
  await execCreateNxWorkspace({ name: appName });

  // Change the cwd of the current process to the newly created Nx workspace.
  cd('test1');

  await writeNpmrc(cwd());

  const npmPackages = [
    '@tractr/schematics',
    '@nrwl/angular',
    '@nrwl/react',
    '@nrwl/nest',
  ];

  // Installing the missing dependencies
  await $`npm install --save-dev ${npmPackages}`;

  await $`nx g @tractr/schematics:hapify-workspace --name test1 --verbose`;

  await $`npm install --force`;
}
