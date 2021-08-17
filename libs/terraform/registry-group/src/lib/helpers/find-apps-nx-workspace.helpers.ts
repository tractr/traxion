import { resolve } from 'path';

import { existsSync, readdirSync } from 'fs-extra';

export function getAppsDir(): string {
  return resolve(process.cwd(), 'apps');
}

export function listFolderInDirectory(path: string): string[] {
  return readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export function guessNxDockerizedAppsNames(): string[] {
  const appsDir = getAppsDir();
  return listFolderInDirectory(appsDir).filter((appName) =>
    existsSync(resolve(appsDir, appName, 'Dockerfile')),
  );
}
