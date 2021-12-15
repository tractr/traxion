import { execAsync } from '../../helpers/exec-async';
import { GenerateExecutorSchema } from './schema';

export default async function runExecutor(options: GenerateExecutorSchema) {
  const { path } = options;
  const { projectName } = options;
  const countParentFolder = projectName.split('/').length + 1;
  const pathToNodeModules = `${'../'.repeat(countParentFolder)}node_modules`;

  await execAsync(`npx rimraf src/lib/generated`, { cwd: path });

  await execAsync(
    `node ${pathToNodeModules}/@tractr/hapify-generate-config/src/index.js`,
    {
      cwd: path,
    },
  );

  await execAsync(`npx hpf generate`, { cwd: path });

  await execAsync(`mv generated/${projectName} src/lib/generated`, {
    cwd: path,
  });

  await execAsync(`npx rimraf generated`, {
    cwd: path,
  });

  await execAsync(
    `node ${pathToNodeModules}/@tractr/update-templates-import-path/src/index.js`,
    {
      cwd: path,
    },
  );

  return {
    success: true,
    projectName,
    path,
  };
}
