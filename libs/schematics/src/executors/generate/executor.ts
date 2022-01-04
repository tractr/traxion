import { exec } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';

import { ExecutorContext, logger } from '@nrwl/devkit';
import { copy, pathExists, readdir, remove } from 'fs-extra';

import { GenerateExecutorSchema } from './schema';

import { getHapifyConfig } from '@tractr/hapify-common';
import { getHapifyOptions } from '@tractr/hapify-generate-config';
import { processImportReplacements } from '@tractr/hapify-update-templates-import-path';

function getOutputGeneratedFolder(
  projectDirectory: string,
  rootDir: string,
  outputGeneratedPath: string,
): string {
  return join(
    projectDirectory,
    rootDir === 'src' ? rootDir : `${rootDir}/src`,
    outputGeneratedPath,
  );
}

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
      moveGeneratedFiles,
      secondaryEntrypoints,
    } = options;
    const projectDirectory = join(root, cwd);
    const inputHapifyPath = join(projectDirectory, inputHapifyGeneratedPath);

    // We filter out the entrypoints that does not exist on the file system
    const entrypoints = (
      await Promise.all(
        [...new Set(['src', ...secondaryEntrypoints])].map(async (rootDir) => {
          if (!(await pathExists(join(projectDirectory, rootDir)))) return null;
          return rootDir;
        }),
      )
    ).filter((promise): promise is string => typeof promise === 'string');

    const packageName: string = (
      await import(join(projectDirectory, 'package.json'))
    ).name;

    if (!packageName)
      throw new Error(
        `could not found the package.json file in ${projectDirectory}`,
      );

    if (isVerbose) logger.debug(`Check if ${projectDirectory} exists`);

    // Check if the project directory has a package json
    if (!(await pathExists(join(projectDirectory)))) {
      throw new Error(
        `The path "${projectDirectory}" seems to be not a valid project directory`,
      );
    }

    const hapifyConfig = await getHapifyConfig(projectDirectory);
    if (!hapifyConfig)
      throw new Error(`No hapify config found in ${projectDirectory} folder`);

    if (cleanFirst) {
      if (isVerbose) logger.debug(`Cleaning files`);
      // First, we delete the generated folder
      try {
        await remove(inputHapifyPath);

        await Promise.all(
          entrypoints.map(async (rootDir) => {
            await remove(
              getOutputGeneratedFolder(
                projectDirectory,
                rootDir,
                outputGeneratedPath,
              ),
            );
          }),
        );
      } catch {
        // We allow the folder to not exist
      }
    }

    // Then, we generate the configuration files
    if (isVerbose) logger.debug(`Generating the configuration files`);
    await getHapifyOptions(projectDirectory);

    // Then we run the hapify generate command
    if (isVerbose) logger.debug(`Generating the hapify files`);
    const { stdout, stderr } = await execAsync(`npx hpf generate`, {
      cwd: projectDirectory,
    });

    if (stderr) throw new Error(stderr);
    if (isVerbose) logger.debug(stdout);

    const generatedTemplates = await readdir(inputHapifyPath);

    if (moveGeneratedFiles) {
      if (isVerbose)
        logger.debug(`Moving the generated files from ${outputGeneratedPath}`);

      // We move all the genererated files to the outputs folder
      // Then we remove all the generated folder that need to go in a second entry point

      await Promise.all(
        entrypoints.map(async (rootDir) => {
          const outputDir = getOutputGeneratedFolder(
            projectDirectory,
            rootDir,
            outputGeneratedPath,
          );

          // We move the generated files
          await copy(inputHapifyPath, outputDir);

          // We remove the folders that need to go in a secondary rootDir
          await Promise.all(
            generatedTemplates.map(async (template) => {
              if (rootDir === 'src') {
                const toRemove = entrypoints.filter((dir) => dir !== 'src');

                await Promise.all(
                  toRemove.map(async (removeFolder) => {
                    try {
                      await remove(join(outputDir, template, removeFolder));
                    } catch {
                      // We allow the folder to not exist
                    }
                  }),
                );
              } else {
                const toKeep = rootDir;

                await Promise.all(
                  (
                    await readdir(join(outputDir, template))
                  )
                    .filter((dir) => dir !== toKeep)
                    .map(async (toRemove) => {
                      try {
                        await remove(join(outputDir, template, toRemove));
                      } catch {
                        // We allow the folder to not exist
                      }
                    }),
                );
              }
            }),
          );
        }),
      );

      await remove(inputHapifyPath);
    }

    if (isVerbose) logger.debug(`Updating the templates import path`);
    await Promise.all(
      entrypoints.map(async (rootDir) =>
        processImportReplacements(
          getOutputGeneratedFolder(
            projectDirectory,
            rootDir,
            outputGeneratedPath,
          ),
          {
            ...(hapifyConfig.importReplacements || {}),
            ...(rootDir === 'src'
              ? {}
              : generatedTemplates.reduce(
                  (acc, template) => ({
                    ...acc,
                    [template]: packageName,
                    '': packageName,
                  }),
                  {},
                )),
          } as Record<string, string>,
        ),
      ),
    );

    if (format && entrypoints.length > 0) {
      if (isVerbose)
        logger.debug(`Formating the generated files:`, entrypoints.join(','));
      await execAsync(
        `npx prettier '${projectDirectory}/${
          entrypoints.length > 1 ? `{${entrypoints.join(',')}}` : entrypoints[0]
        }/${outputGeneratedPath}/**/*.ts' --write`,
      );
    }

    return { success: true };
  } catch (e: unknown) {
    return e;
  }
}
