import { $, cd } from 'zx';
import { argv, cwd } from 'process';
import { dirname, relative, join } from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';

const __dirname = dirname(fileURLToPath(import.meta.url));
const currentPath = cwd();

const program = new Command();
program.requiredOption('--name <name>', 'workspace name');
program.parse(argv);

const options = program.opts();

cd(join(__dirname, '..'));

await $`nx run-many --target build --projects hapify-create-hapify-workspace,schematics`;
await $`chmod +x ./dist/libs/hapify/create-hapify-workspace/bin/create-hapify-workspace.js`;

cd(currentPath);

await $`rm -rf ${options.name}`;

const relativePath = relative(currentPath, join(__dirname, '..'));
await $`node ${
  relativePath +
  '/dist/libs/hapify/create-hapify-workspace/bin/create-hapify-workspace.js'
} ${argv.splice(2)}`;
