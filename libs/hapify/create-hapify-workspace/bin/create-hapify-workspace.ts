#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { env } from 'process';
import { fileURLToPath } from 'url';

import { ProcessOutput } from 'zx';

import { createHapifyWorkspace } from '../src/index.js';

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

console.info('Creating Hapify workspace...');

createHapifyWorkspace().catch(async (error: unknown) => {
  if (error instanceof ProcessOutput) {
    if (error.exitCode === 1) return;
  }
  console.error(
    `Something went wrong! v${await getCurrentPackageJsonVersion()}`,
  );
});
