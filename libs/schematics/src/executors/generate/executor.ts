import { join } from 'path';

import { execAsync } from '../../helpers/exec-async';
import { GenerateExecutorSchema } from './schema';

export default async function runExecutor(options: GenerateExecutorSchema) {
  const { cwd, pathToLib, sourcePath, format, outputPath } = options;

  await execAsync(`npx rimraf src/lib/generated`, { cwd });

  await execAsync(`node ${join(pathToLib, 'generate-config')}`);

  await execAsync(`npx hpf generate`);

  if (sourcePath && outputPath) {
    await execAsync(`mv ${join(sourcePath)} ${join(outputPath)}`, {
      cwd,
    });

    if (format)
      await execAsync(`npx prettier '${join(outputPath)}/**/*.ts' --write`, {
        cwd,
      });

    await execAsync(`npx rimraf ${join(sourcePath)}`, {
      cwd,
    });
  }

  await execAsync(`node ${join(pathToLib, 'update-templates-import-path')}`);

  return {
    success: true,
    outputPath,
    sourcePath,
    pathToLib,
    cwd,
    format,
  };
}
