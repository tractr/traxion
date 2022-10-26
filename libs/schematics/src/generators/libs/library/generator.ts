import {
  addDependenciesToPackageJson,
  formatFiles,
  getProjects,
  Tree,
} from '@nrwl/devkit';

import { installPackagesTask } from '../../../helpers';
import { DEFAULT_TRAXION_PACKAGES_DEPS } from '../../../schematics.constants';
import { hapifyCliVersion, traxionVersion } from '../../../versions.constants';
import addGenerateTarget from '../../targets/generate/generator';
import initWorkspace from '../../workspace/initialize-nx-workspace/generator';
import {
  addFiles,
  addImplicitDependencies,
  addTemplateDependencies,
  generateLibrary,
  normalizeOptions,
  updateGitIgnoreEntry,
} from './helpers';
import { addBabelRc } from './helpers/add-babelrc.helper';
import { HapifyLibraryGeneratorOptionsWithExtra } from './schema';

/**
 * Create and configuration a traxion library
 * @param tree
 * @param options
 */
export default async function createTraxionLibrary(
  tree: Tree,
  options: HapifyLibraryGeneratorOptionsWithExtra,
) {
  // Format and get the options from the cli
  const normalizedOptions = normalizeOptions(tree, options);

  // Default values for library generator options
  const { extra, projectName, standalone, hapifyTemplate } = normalizedOptions;

  // Initialize the workspace if it has not been already
  await initWorkspace(tree, { ...normalizedOptions.extra });

  const projects = getProjects(tree);
  const projectConfiguration = projects.get(projectName);

  if (!projectConfiguration) {
    // Generate the library
    await generateLibrary(tree, normalizedOptions);

    // Add hapifyrc file to the lib root
    addFiles(tree, normalizedOptions);

    // Update the gitignore file to exclude the generated folder from git
    updateGitIgnoreEntry(tree, normalizedOptions);

    // Add the generate target inside the project configuration
    await addGenerateTarget(tree, {
      project: projectName,
      ...extra,
    });

    // Add the template and the hapify config to the dev dependencies
    addDependenciesToPackageJson(
      tree,
      {},
      ['@tractr/hapify-config', normalizedOptions.template].reduce<
        Record<string, string>
      >(
        (acc, packageName) => {
          acc[packageName] = traxionVersion;
          return acc;
        },
        { '@hapify/cli': hapifyCliVersion },
      ),
    );

    // Add the implicit nx dependencies
    // NOTE: the generated files are ignored from the gitignore files
    // so nx is not able to get the dependencies and we need to set it manually
    addImplicitDependencies(tree, normalizedOptions);

    // Add babel rc if the lib is intent to be used in a react context
    addBabelRc(tree, normalizedOptions);

    // Add the template dependencies
    addTemplateDependencies(tree, normalizedOptions);
  }

  if (!standalone) {
    const dependencies = DEFAULT_TRAXION_PACKAGES_DEPS[hapifyTemplate];

    for (const dependency of dependencies) {
      // eslint-disable-next-line no-await-in-loop
      await createTraxionLibrary(tree, {
        ...options,
        hapifyTemplate: dependency,
        skipInstall: true,
      });
    }
  }

  // Format all the files
  await formatFiles(tree);

  // Install the package inside the node_modules
  installPackagesTask(tree, options);
}
