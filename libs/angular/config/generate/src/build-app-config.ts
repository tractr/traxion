import { join } from 'path';

import { config } from 'dotenv';
import { writeJSONSync } from 'fs-extra';

export function createAppConfigEnvFile(file: string) {
  const env = config().parsed;
  writeJSONSync(join(process.cwd(), file), env);
}
