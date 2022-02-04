import { FsTree } from '@nrwl/tao/src/shared/tree.js';
import { getProjects } from '@nrwl/devkit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readJsonFile } from '@nrwl/devkit';
import { argv, cwd } from 'process';
import { copy } from 'fs-extra';
import { Command } from 'commander/esm.mjs';
import debug from 'debug';

const log = debug('local-install');

const __dirname = dirname(fileURLToPath(import.meta.url));

const program = new Command();

program
  .option('-p, --projects <projects>', 'project list separated by comma', '')
  .option(
    '-t, --targetDir <directory>',
    'target directory to install the packages (default to `${cwd()}/node_modules`)',
    `${cwd()}/node_modules`,
  );
program.parse(argv);

const options = program.opts();
const { targetDir, projects: projectsWithComma } = options;

const projectsWanted = projectsWithComma
  .split(',')
  .map((p) => p.trim())
  .filter((p) => p !== '');

const stackDir = join(__dirname, '..');
const stackTree = new FsTree(stackDir);

const projects = getProjects(stackTree);

for (const [projectName, project] of projects) {
  if (projectsWanted.length > 0 && !projectsWanted.includes(projectName))
    continue;
  if (project.type === 'application') continue;
  if (!project.targets.publish || !project.targets.build) continue;

  const packageJson = readJsonFile(
    join(stackDir, project.root, 'package.json'),
  );
  const packageName = packageJson.name;

  const outputPath =
    project.targets.build.options.outputPath ||
    project.targets.build.outputs[0];

  log(`Installing ${projectName} into ${join(targetDir, packageName)}`);

  await copy(join(stackDir, outputPath), join(targetDir, packageName));
}
