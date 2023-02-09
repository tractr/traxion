import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { ExecutorContext, logger } from '@nrwl/devkit';
import { validRange } from 'semver';

import { UpdateDependenciesExecutorSchema } from './schema';

export function interpolate(template: string, workspaceRoot: string) {
  if (template.includes('{workspaceRoot}', 1)) {
    throw new Error(
      `File path '${template}' is invalid. {workspaceRoot} can only be used at the beginning of the expression.`,
    );
  }

  return template.replace('{workspaceRoot}', workspaceRoot);
}

export function getVersionFromValue(value: string, rootPath: string) {
  let version = value;
  try {
    version = require(value).version; // eslint-disable-line
  } catch (e) {
    try {
      version = require(join(rootPath, value)).version; // eslint-disable-line
    } catch {
      // do nothing
    }
  }
  return version;
}

export default async function runExecutor(
  options: UpdateDependenciesExecutorSchema,
  context: ExecutorContext,
) {
  const rootPath = context.root;
  const projectPath = context.cwd;

  const {
    ignorePackages = [],
    overrides = {},
    forceDepsToBePeerDeps = true,
    packageJsonPath: pckgJsonPath = join(projectPath, 'package.json'),
    peerDependenciesJsonPath: peerDepsJsonPath = join(
      rootPath,
      'peer-dependencies.json',
    ),
  } = options;

  let success = true;
  const packageJsonPath = interpolate(pckgJsonPath, rootPath);
  const peerDependenciesJsonPath = interpolate(peerDepsJsonPath, rootPath);

  if (!existsSync(packageJsonPath)) {
    success = false;
    logger.error('package.json file not found');
  }

  if (!existsSync(peerDependenciesJsonPath)) {
    success = false;
    logger.error('peer dependencies json file not found');
  }

  if (!success) {
    return {
      success,
    };
  }

  const peerDependencies: Record<string, string> = {
    ...JSON.parse(readFileSync(peerDependenciesJsonPath, 'utf-8')),
    ...overrides,
  };

  const packageJson: {
    peerDependencies?: Record<string, string>;
    dependencies?: Record<string, string>;
  } = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  if (forceDepsToBePeerDeps && packageJson.dependencies) {
    for (const [key] of Object.entries(peerDependencies)) {
      let startWith = '';
      if (key.endsWith('*')) {
        startWith = key.slice(0, -1);
      }

      if (startWith !== '') {
        for (const [packageJsonKey] of Object.entries(
          packageJson.dependencies,
        )) {
          if (
            packageJsonKey.startsWith(startWith) &&
            !ignorePackages.includes(packageJsonKey) &&
            !ignorePackages.includes(key)
          ) {
            packageJson.peerDependencies = {
              ...(packageJson.peerDependencies || {}),
              [packageJsonKey]: packageJson.dependencies[packageJsonKey],
            };

            delete packageJson.dependencies[packageJsonKey];
          }
        }
      } else if (
        packageJson.dependencies[key] &&
        !ignorePackages.includes(key)
      ) {
        packageJson.peerDependencies = {
          ...(packageJson.peerDependencies || {}),
          [key]: packageJson.dependencies[key],
        };

        delete packageJson.dependencies[key];
      }
    }
  }

  if (!packageJson.peerDependencies) {
    return {
      success: true,
    };
  }

  for (const [key, value] of Object.entries(peerDependencies)) {
    const version = getVersionFromValue(value, rootPath);

    if (validRange(version) === null) {
      logger.error(`Invalid version '${version}' for ${key}`);
      return {
        success: false,
      };
    }

    let startWith = '';
    if (key.endsWith('*')) {
      startWith = key.slice(0, -1);
    }

    if (startWith !== '') {
      for (const [packageJsonKey] of Object.entries(
        packageJson.peerDependencies,
      )) {
        if (
          packageJsonKey.startsWith(startWith) &&
          !ignorePackages.includes(packageJsonKey) &&
          !ignorePackages.includes(key)
        ) {
          packageJson.peerDependencies[packageJsonKey] = version;
        }
      }
    } else if (
      packageJson.peerDependencies[key] &&
      !ignorePackages.includes(key)
    ) {
      packageJson.peerDependencies[key] = version;
    }
  }

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  return {
    success: true,
  };
}
