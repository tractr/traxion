#!/usr/bin/env node

import * as path from 'path';

import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';

function createAppConfigEnvFile(file: string) {
  const env = dotenv.config().parsed;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  fs.writeJSONSync(path.join(process.cwd(), file), env);
}

const filePath = process.argv.slice(2)[0];
if (!filePath) throw new Error('filePath is not defined');
createAppConfigEnvFile(filePath);
