import { exec } from 'child_process';
import { promisify } from 'util';

import { GenerateExecutorSchema } from './schema';

const execAsync = promisify(exec);

export default async function runExecutor(options: GenerateExecutorSchema) {
  const { path } = options;
  const { projectName } = options;
  const countParentFolder = projectName.split('/').length + 1;
  const pathToNodeModules = `${'../'.repeat(countParentFolder)}node_modules`;

  await execAsync(`npx rimraf src/lib/generated`, { cwd: path }).catch((err) =>
    console.error(err),
  );

  await execAsync(
    `node ${pathToNodeModules}/@tractr/hapify-generate-config/src/index.js`,
    {
      cwd: path,
    },
  ).catch((err) => console.error(err));

  await execAsync(`npx hpf generate`, { cwd: path }).catch((err) =>
    console.error(err),
  );

  await execAsync(`mv generated/${projectName} src/lib/generated`, {
    cwd: path,
  }).catch((err) => console.error(err));

  await execAsync(`npx rimraf generated`, {
    cwd: path,
  }).catch((err) => console.error(err));

  await execAsync(
    `node ${pathToNodeModules}/@tractr/update-templates-import-path/src/index.js`,
    {
      cwd: path,
    },
  ).catch((err) => console.error(err));

  return {
    success: true,
    projectName,
    path,
  };
}

// "commands": [
//   "npx rimraf generated",
//   "cp -r ../../dist/libs/hapify/hapify-common ../../node_modules/@tractr",
//   "node ../../dist/libs/hapify/generate-config/src/index.js",
//   "npx hpf generate",
//   "node ../../dist/libs/hapify/update-templates-import-path/src/index.js"
// ],

// "npx rimraf src/lib/generated",
// "node ../../../node_modules/.bin/hpf-generate-config",
// {
//   "command": "npx hpf generate",
//   "forwardAllArgs": false
// },
// "mv generated/rest-dtos src/lib/generated",
// "npx rimraf generated",
// "node ../../../tools/hapify-replace-path.js"
