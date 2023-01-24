import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import * as chalk from 'chalk';
import { PackageDependencies } from 'depcheck';
import * as yargs from 'yargs';

import getDiscrepancies from './discrepancies';
import getMissingDependencies from './missing';
import getUnusedDependencies from './unused';

(async () => {
  const program = yargs
    .usage('Check projects for dependency discrepancies.')
    .option('projects', {
      alias: 'p',
      type: 'array',
      description: 'Projects to check',
    })
    .option('unused', {
      alias: 'm',
      type: 'boolean',
      default: true,
      description: 'Check for unused dependencies',
    })
    .option('missing', {
      alias: 'm',
      type: 'boolean',
      default: true,
      description: 'Check for missing dependencies',
    })
    .option('discrepancies', {
      alias: 'd',
      type: 'boolean',
      default: true,
      description:
        'Check for discrepancies between package and dev dependencies',
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging',
    });

  const { devDependencies }: { devDependencies: PackageDependencies } =
    JSON.parse(readFileSync(`./package.json`).toString());

  const rootDirectory = join(__dirname, '../../..');
  const packagesDirectory = join(rootDirectory, 'dist', 'libs');
  const codeDirectory = join(rootDirectory, 'libs');

  const argv = await program.argv;

  const projects =
    argv.projects ||
    readdirSync(packagesDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      // We will check a deeper level of directories for projects
      .flatMap((name) => {
        if (existsSync(join(packagesDirectory, name, 'package.json')))
          return name;

        const projectPath = join(packagesDirectory, name);
        return readdirSync(projectPath, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name)
          .map((subName) => `${name}/${subName}`);
      })
      .filter((name) =>
        existsSync(join(packagesDirectory, name, 'package.json')),
      );

  const verbose = argv.verbose ?? false;

  const {
    // peerDependencies: rootPeerDependencies = {},
    // devDependencies: rootDevDependencies = {},
    dependencies: rootDependencies = {},
  }: {
    dependencies: PackageDependencies;
    peerDependencies: PackageDependencies;
    devDependencies: PackageDependencies;
  } = JSON.parse(readFileSync(`${rootDirectory}/package.json`).toString());

  const results = await Promise.all(
    projects
      .sort()
      .filter((name): name is string => typeof name === 'string')
      .map((name) => ({ name }))
      .map(async (project) => {
        const projectPath = join(codeDirectory, project.name);
        const packagePath = join(packagesDirectory, project.name);
        const {
          dependencies = {},
          peerDependencies = {},
        }: {
          dependencies: PackageDependencies;
          peerDependencies: PackageDependencies;
        } = JSON.parse(readFileSync(`${packagePath}/package.json`).toString());

        const missing = argv.missing
          ? await getMissingDependencies(
              project.name,
              projectPath,
              { ...rootDependencies, ...dependencies, ...peerDependencies },
              verbose,
            )
          : [];

        const unused = argv.unused
          ? await getUnusedDependencies(
              project.name,
              projectPath,

              { ...dependencies, ...(peerDependencies || {}) },
            )
          : [];

        const discrepancies = argv.discrepancies
          ? getDiscrepancies(project.name, dependencies, devDependencies)
          : [];

        return { ...project, missing, discrepancies, unused };
      }),
  );

  const total = { missing: 0, discrepancies: 0, unused: 0 };

  results.forEach(({ name, missing, discrepancies, unused }) => {
    if (!missing.length && !discrepancies.length && !unused.length) {
      return;
    }

    console.info(`${chalk.inverse.bold.cyan(` ${name.toUpperCase()} `)}`);

    if (missing.length > 0) {
      total.missing += missing.length;
      console.info(
        `⚠️  ${chalk.bold.inverse(` Missing `)}\n${missing
          .sort()
          .map(
            (p) =>
              `   ${devDependencies[p] ? `${p}@${devDependencies[p]}` : p}`,
          )
          .join(`\n`)}\n`,
      );
    }

    if (unused.length > 0) {
      total.unused += unused.length;
      console.info(
        `⚠️  ${chalk.bold.inverse(` Unused`)}\n    ${unused.join('\n    ')}\n`,
      );
    }

    if (discrepancies.length > 0) {
      total.discrepancies += discrepancies.length;
      console.info(
        `⛔  ${chalk.bold.inverse(` Discrepancies `)}\n${discrepancies
          .map((d) => `   ${d}`)
          .join(`\n`)}\n`,
      );
    }
  });

  if (total.discrepancies > 0 || total.missing > 0 || total.unused > 0) {
    process.exit(1);
  }

  process.exit(0);
})().catch((err) => console.info(err));
