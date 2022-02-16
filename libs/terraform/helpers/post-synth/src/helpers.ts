import * as Fs from 'fs';
import * as Path from 'path';

import { sync as pkgDirSync } from 'pkg-dir';

/**
 * Returns the cdk.tf.json file path
 */
export function getTerraformOutputPath() {
  // Get generated Terraform output path
  const pkgDir = pkgDirSync(__dirname);
  if (!pkgDir) {
    throw new Error('Could not find package directory');
  }

  return Path.resolve(
    pkgDir,
    'dist',
    'cdktf.out',
    'stacks',
    'main',
    'cdk.tf.json',
  );
}

/**
 * Returns the cdk.tf.json content
 */
export function getTerraformOutputContentAsString(): string {
  return Fs.readFileSync(getTerraformOutputPath(), { encoding: 'utf8' });
}

/**
 * Returns the cdk.tf.json content as JSON
 */
export function getTerraformOutputContentAsJson<T = unknown>(): T {
  return JSON.parse(getTerraformOutputContentAsString());
}

/**
 * Sets the cdk.tf.json content
 */
export function setTerraformOutputContent(content: string) {
  Fs.writeFileSync(getTerraformOutputPath(), content, { encoding: 'utf8' });
}
