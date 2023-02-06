export interface UpdateDependenciesExecutorSchema {
  /**
   * Where to look for the information about the dependencies to update.
   * If not provided, the dependencies will be read from the peerDependencies.json file in the root of the workspace.
   */
  peerDependenciesJsonPath?: string;

  /**
   * The path to the package.json file to update.
   * If not provided, the package.json file in the current project working directory will be used.
   */
  packageJsonPath?: string;

  /**
   * The list of packages to ignore when replacing the peer dependencies version in the package.json file.
   */
  ignorePackages?: string[];

  /**
   * A peer dependencies object that will override the peer dependencies found in the peerDependenciesJsonPath
   */
  overrides?: Record<string, string>;
}
