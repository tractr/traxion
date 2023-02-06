import * as chalk from 'chalk';
import * as depcheck from 'depcheck';
import { satisfies } from 'semver';

// Ignore packages that are defined here per package
const IGNORE_MATCHES: Record<string, string[]> = {
  '*': [],
  angular: ['webpack-merge', '@phenomnomnominal/tsquery'],
  cypress: ['webpack', '@babel/core', 'babel-loader'],
};

export default function getDiscrepancies(
  name: string,
  projectDependencies: depcheck.PackageDependencies,
  devDependencies: depcheck.PackageDependencies,
) {
  return Object.keys(projectDependencies)
    .filter((p) => !p.startsWith('@nrwl/') && p !== 'nx')
    .filter((p) =>
      !IGNORE_MATCHES['*'].includes(p) && IGNORE_MATCHES[name]
        ? !IGNORE_MATCHES[name].includes(p)
        : true,
    )
    .filter(
      (p) =>
        devDependencies[p] &&
        projectDependencies[p] !== devDependencies[p] &&
        !satisfies(devDependencies[p], projectDependencies[p]),
    )
    .map(
      (p) => `${p}@${devDependencies[p]} ${chalk.dim(projectDependencies[p])}`,
    );
}
