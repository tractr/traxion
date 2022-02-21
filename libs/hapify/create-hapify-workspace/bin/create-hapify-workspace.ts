#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { argv, env } from 'process';
import { fileURLToPath } from 'url';

import { Command } from 'commander';
import { ProcessOutput } from 'zx';

import {
  createHapifyWorkspace,
  CreateHapifyWorkspaceOptions,
} from '../src/index.js';

export async function getCurrentPackageJson() {
  const dirnamePath = dirname(fileURLToPath(import.meta.url));

  const packageJsonPath = join(dirnamePath, '../package.json');
  const packageJsonFile = await readFile(packageJsonPath);

  return JSON.parse(packageJsonFile.toString());
}

export async function getCurrentPackageJsonVersion() {
  return (await getCurrentPackageJson()).version;
}

// Force the subprocess to display the color
env.FORCE_COLORS = '3';

const program = new Command();

program
  .requiredOption('--name <name>', 'workspace name')
  .option('--apiName <name>', 'name of the api', 'api')
  .option('--pwaName <name>', 'name of the pwa', 'pwa')
  .option('--adminName <name>', 'name of the admin', 'admin')
  .option('--libsPath <path>', 'path of the library folder', 'libs')
  .option('--appsPath <path>', 'path of the apps folder', 'apps')
  .option(
    '--generatedDir <directory>',
    'path of the generated folder (relatif of libsPath)',
    'admin',
  );

program.parse(argv);

const options = program.opts();

const { name, apiName, libsPath, appsPath, generatedDir } = options;

const createHapifyWorkspaceOptions: CreateHapifyWorkspaceOptions = {
  name,
  apiName,
  libsPath,
  appsPath,
  generatedDir,
};

console.info('Creating Hapify workspace...');

createHapifyWorkspace(createHapifyWorkspaceOptions).catch(
  async (error: unknown) => {
    if (error instanceof ProcessOutput) {
      if (error.exitCode === 1) return;
    }
    console.error(
      `Something went wrong! v${await getCurrentPackageJsonVersion()}`,
    );
  },
);
