import fetch from 'node-fetch';

export const NPM_REGISTRY = 'https://registry.npmjs.org';

export interface NpmApiGet {
  'dist-tags': {
    latest: string;
  };
}

/**
 * Get the latest package version from a registry
 *
 * @param packageName The packageName that we want to get the latest version from registry
 * @param registry The registry against we will fetch our informations (npm registry only)
 * @returns the version retrieved
 */
export async function getLatestPackageVersion(
  packageName: string,
  registry: string = NPM_REGISTRY,
) {
  if (registry !== NPM_REGISTRY)
    throw new Error(
      `Only npm (${NPM_REGISTRY}) is supported to get the latest version of a package`,
    );

  const packageUrl = `${registry}/${packageName}`;

  const semverResponse = await fetch(packageUrl);
  const semver = (await semverResponse.json()) as NpmApiGet;

  return semver['dist-tags'].latest;
}
