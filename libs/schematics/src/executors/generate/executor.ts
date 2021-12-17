import { join } from 'path';

import { ExecutorContext } from '@nrwl/devkit';
import { move, pathExists, remove } from 'fs-extra';

import { execAsync } from '../../helpers/exec-async';
import { GenerateExecutorSchema } from './schema';

import { getHapifyOptions } from '@tractr/hapify-generate-config';
import { hapifyUpdateTemplatesImportPath } from '@tractr/update-templates-import-path';

/**
 * Executes the schematics generate command.
 * @param options GenerateExecutorSchema
 * @returns { success: boolean }
 */
export default async function runExecutor(
  options: GenerateExecutorSchema,
  context: ExecutorContext,
) {
  const { root } = context;

  const {
    cleanFirst,
    cwd,
    inputHapifyGeneratedPath,
    outputGeneratedPath,
    format,
  } = options;

  const projectDirectory = join(root, cwd);
  const pathToGeneratedFolder = join(projectDirectory, outputGeneratedPath);

  // Check if the project directory has a package json
  if (!(await pathExists(join(projectDirectory)))) {
    throw new Error('The cwd path seems to be not a valid project directory');
  }

  if (cleanFirst) {
    // First, we delete the generated folder
    try {
      await remove(pathToGeneratedFolder);
    } catch {
      // We allow the folder to not exist
    }
  }

  // Then, we generate the configuration files
  await getHapifyOptions(projectDirectory);

  // Then we run the hapify generate command
  await execAsync(`npx hpf generate`, { cwd: projectDirectory });

  if (inputHapifyGeneratedPath !== outputGeneratedPath) {
    await move(
      join(projectDirectory, inputHapifyGeneratedPath),
      pathToGeneratedFolder,
    );
  }

  await hapifyUpdateTemplatesImportPath(
    pathToGeneratedFolder,
    projectDirectory,
  );

  if (format) {
    await execAsync(
      `npx prettier '${join(
        projectDirectory,
        outputGeneratedPath,
      )}/**/*.ts' --write`,
    );
  }

  return { success: true };
}
