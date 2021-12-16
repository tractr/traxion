import { join } from 'path';

import { execAsync } from '../../helpers/exec-async';
import { GenerateExecutorSchema } from './schema';

export default async function runExecutor(options: GenerateExecutorSchema) {
  const { cwd, folder, path } = options;

  await execAsync(`npx rimraf src/lib/generated`, { cwd });

  await execAsync(`node ${join(path, 'generate-config')}`, {});

  await execAsync(`npx hpf generate`, {});

  await execAsync(
    `mv ${join('generated', folder)} ${join('src', 'lib', 'generated')}`,
    {
      cwd,
    },
  );

  await execAsync(`npx rimraf generated`, {
    cwd,
  });

  await execAsync(`node ${join(path, 'update-templates-import-path')}`, {});

  return {
    success: true,
    folder,
    path,
    cwd,
  };
}
