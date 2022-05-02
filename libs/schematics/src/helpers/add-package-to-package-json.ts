import {
  addDependenciesToPackageJson,
  GeneratorCallback,
  removeDependenciesFromPackageJson,
  Tree,
} from '@nrwl/devkit';

import {
  getLatestPackageVersion,
  NPM_REGISTRY,
} from './get-latest-package-version';

export enum PackageType {
  dependencies = 'dependencies',
  devDependencies = 'devDependencies',
}

export interface PackageDefinition {
  packageName: string;
  version?: string;
  type?: PackageType;
  registry?: string;
}

export type Packages =
  | string
  | PackageDefinition
  | Array<string | PackageDefinition>;

/**
 * Add a package or a package list to the package json
 * If no version is specify, this function intent to fetch the last version
 * from the registry
 * @param tree the tree where the package json need to be update
 * @param packages the package list to add
 * @returns a promise generator callback list
 */
export async function addPackageToPackageJson(
  tree: Tree,
  packages: Packages,
  defaultTarget: PackageType = PackageType.devDependencies,
): Promise<GeneratorCallback[]> {
  const packagesDefinitions = Array.isArray(packages) ? packages : [packages];

  return Promise.all(
    packagesDefinitions.map(async (packageDefinition) => {
      const {
        packageName,
        version = null,
        type = defaultTarget,
        registry = NPM_REGISTRY,
      } = typeof packageDefinition === 'string'
        ? { packageName: packageDefinition }
        : packageDefinition;

      const toAddToPackageJson = {
        [packageName]:
          version !== null
            ? version
            : await getLatestPackageVersion(packageName, registry),
      };

      removeDependenciesFromPackageJson(tree, [packageName], [packageName]);
      return addDependenciesToPackageJson(
        tree,
        type === PackageType.dependencies ? toAddToPackageJson : {},
        type === PackageType.devDependencies ? toAddToPackageJson : {},
      );
    }),
  );
}
