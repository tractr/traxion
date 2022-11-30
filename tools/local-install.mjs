import { FsTree } from '@nrwl/tao/src/shared/tree.js';
import { getProjects } from '@nrwl/devkit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readJsonFile } from '@nrwl/devkit';
import { argv, cwd } from 'process';
import { copy } from 'fs-extra';
import { Command } from 'commander/esm.mjs';
import debug from 'debug';
import { $ } from 'zx';

$.verbose = false;

const log = debug('local-install');

const __dirname = dirname(fileURLToPath(import.meta.url));

const program = new Command();

program
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
  if (projectsWanted.length > 0 && !projectsWanted.includes(projectName))
    continue;
  if (project.type === 'application') continue;
  if (!project.targets.publish || !project.targets.build) continue;

  const outputPath =
    project.targets.build.options.outputPath ||
    project.targets.build.outputs[0];

  const packageJson = readJsonFile(
    join(traxionDir, outputPath, 'package.json'),
  );
  const packageName = packageJson.name;

  toCopy.push([join(traxionDir, outputPath), join(targetDir, packageName)]);

  if (packageJson.dependencies)
    packagesToInstall.push(
      ...Object.entries(packageJson.dependencies).map(
        ([packageName, version]) => `${packageName}@${version}`,
      ),
    );
}

log(`Installing dependencies`);
if (install) await $`npm install -f ${packagesToInstall}`;

for (const [source, target] of toCopy) {
  log(`Copying ${source} to ${target}`);
  await copy(source, target);
}
