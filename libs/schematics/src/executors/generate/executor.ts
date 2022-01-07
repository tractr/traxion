import { exec } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';

import { ExecutorContext, logger } from '@nrwl/devkit';
import { move, pathExists, remove } from 'fs-extra';

import { GenerateExecutorSchema } from './schema';

import { getHapifyOptions } from '@tractr/hapify-generate-config';
import { hapifyUpdateTemplatesImportPath } from '@tractr/hapify-update-templates-import-path';

/**
 * Executes the schematics generate command.
 * @param options GenerateExecutorSchema
 * @returns { success: boolean }
 */
export default async function runExecutor(
  options: GenerateExecutorSchema,
  context: ExecutorContext,
) {
  try {
    const execAsync = promisify(exec);
    const { root, isVerbose } = context;

    const {
      cleanFirst,
      cwd,
      inputHapifyGeneratedPath,
      outputGeneratedPath,
      format,
    } = options;

    const projectDirectory = join(root, cwd);
    const pathToGeneratedFolder = join(projectDirectory, outputGeneratedPath);

    if (isVerbose) logger.debug(`Check if ${projectDirectory} exists`);

    // Check if the project directory has a package json
    if (!(await pathExists(join(projectDirectory)))) {
      throw new Error(
        `The path "${projectDirectory}" seems to be not a valid project directory`,
      );
    }

    if (cleanFirst) {
      if (isVerbose) logger.debug(`Remove ${pathToGeneratedFolder}`);
      // First, we delete the generated folder
      try {
        await remove(pathToGeneratedFolder);
      } catch {
        // We allow the folder to not exist
      }
    }

    // Then, we generate the configuration files
    if (isVerbose) logger.debug(`Generate the configuration files`);
    await getHapifyOptions(projectDirectory);

    // Then we run the hapify generate command
    if (isVerbose) logger.debug(`Generate the hapify files`);
    const { stdout, stderr } = await execAsync(`npx hpf generate`, {
      cwd: projectDirectory,
    });

    if (stderr) throw new Error(stderr);
    if (isVerbose) logger.debug(stdout);

    if (inputHapifyGeneratedPath !== outputGeneratedPath) {
      if (isVerbose)
        logger.debug(`Move the generated files to ${outputGeneratedPath}`);
      await move(
        join(projectDirectory, inputHapifyGeneratedPath),
        pathToGeneratedFolder,
      );
    }

    if (isVerbose) logger.debug(`Update the templates import path`);
    await hapifyUpdateTemplatesImportPath(
      pathToGeneratedFolder,
      projectDirectory,
    );

    if (format) {
      if (isVerbose) logger.debug(`Format the generated files`);
      await execAsync(
        `npx prettier '${join(
          projectDirectory,
          outputGeneratedPath,
        )}/**/*.ts' --write`,
      );
    }

    return { success: true };
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    logger.error(e.message);
    return { success: false };
  }
}
