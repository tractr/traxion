import { FsTree } from '@nrwl/tao/src/shared/tree.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { argv, cwd } from 'process';
import { copy } from 'fs-extra';
import { Command } from 'commander/esm.mjs';
import debug from 'debug';
import { $ } from 'zx';
import pkg from '@nrwl/devkit';

const { getProjects, readJsonFile } = pkg;

const log = debug('local-install');

const __dirname = dirname(fileURLToPath(import.meta.url));

const program = new Command();

program
  .option('--verbose', 'display some log', false)
  .option('-p, --projects <projects>', 'project list separated by comma', '')
  .option('--install', 'install the package dependencies', false)
  .option(
    '-t, --targetDir <directory>',
    'target directory to install the packages (default to `${cwd()}/node_modules`)',
    `${cwd()}/node_modules`,
  );
program.parse(argv);

const options = program.opts();
const { targetDir, projects: projectsWithComma, install } = options;

$.verbose = options.verbose;

const projectsWanted = projectsWithComma
  .split(',')
  .map((p) => p.trim())
  .filter((p) => p !== '');

const traxionDir = join(__dirname, '..');
const traxionTree = new FsTree(traxionDir);

const projects = getProjects(traxionTree);

const packagesToInstall = [];
const toCopy = [];

for (const [projectName, project] of projects) {
  if (projectsWanted.length > 0 && !projectsWanted.includes(projectName)) {
    continue;
  }
  if (project.type === 'application') {
    console.warn(`Skipping ${projectName} because it is an application`);
    continue;
  }
  if (!project.targets.publish && !project.targets.build) {
    console.warn(
      `Skipping ${projectName} because it has no publish or build target`,
    );
    continue;
  }

  let outputPath =
    project.targets.build?.options.outputPath ||
    project.targets.build?.outputs?.[0];

  if (!outputPath) {
    console.warn(`Skipping ${projectName} because it has no output path`);
    continue;
  }

  outputPath = outputPath.replace('{workspaceRoot}', '');

  const packageJson = readJsonFile(
    join(traxionDir, outputPath, 'package.json'),
  );
  const packageName = packageJson.name;

  toCopy.push([
    join(traxionDir, outputPath),
    join(targetDir, packageName),
    packageJson,
  ]);

  if (packageJson.dependencies)
    packagesToInstall.push(
      ...Object.entries(packageJson.dependencies).map(
        ([packageName, version]) => `${packageName}@${version}`,
      ),
    );
}

log(`Installing dependencies ${packagesToInstall}`);
if (install) await $`npm install -f ${packagesToInstall}`;

for (const [source, target, packageJson] of toCopy) {
  log(`Copying ${source} to ${target}`);
  await copy(source, target);

  if (packageJson.bin) {
    const bins =
      typeof packageJson.bin === 'string'
        ? { [packageJson.bin]: packageJson.bin }
        : packageJson.bin;
    for (const [binName, binPath] of Object.entries(bins)) {
      log(
        `Creating symlink for ${binName} into the node_modules/.bin directory`,
      );
      await $`ln -sf ${join(target, binPath)} ${join(
        targetDir,
        '.bin',
        binName,
      )}`;
      await $`chmod +x ${join(targetDir, '.bin', binName)}`;
    }
  }
}
