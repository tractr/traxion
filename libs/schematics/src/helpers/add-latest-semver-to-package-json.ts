import {
  addDependenciesToPackageJson,
  GeneratorCallback,
  Tree,
} from '@nrwl/devkit';
import fetch from 'node-fetch';

export async function addLatestSemverToPackageJson(
  tree: Tree,
  packageName: string,
  registry = 'https://registry.npmjs.org',
): Promise<GeneratorCallback> {
  const packageUrl = `${registry}/${packageName}`;

  const semverResponse = await fetch(packageUrl);
  const semver = await semverResponse.json();

  return addDependenciesToPackageJson(
    tree,
    {},
    {
      [packageName]: semver['dist-tags'].latest,
    },
  );
}
