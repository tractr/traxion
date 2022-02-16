import {
  getWorkspaceLayout,
  joinPathFragments,
  names,
  Tree,
} from '@nrwl/devkit';

export interface ProjectDefaultOptions {
  name: string;
  directory: string | undefined;
  projectDirectory: string;
  projectName: string;
  projectRoot: string;
}

export function getNormalizedProjectDefaultsOptions(
  tree: Tree,
  {
    name: rawName,
    directory: rawDirectory,
  }: { name: string; directory: string | undefined },
): ProjectDefaultOptions {
  // Fetch workspace data
  const { libsDir } = getWorkspaceLayout(tree);

  // Format case for user input
  const name = names(rawName).fileName;
  const directory = rawDirectory ? names(rawDirectory).fileName : undefined;

  // Process project data from user input
  const projectDirectory = directory ? `${directory}/${name}` : name;
  const projectName = projectDirectory.replace(/\//g, '-');
  const projectRoot = joinPathFragments(libsDir, projectDirectory);

  return {
    name,
    directory,
    projectDirectory,
    projectName,
    projectRoot,
  };
}
