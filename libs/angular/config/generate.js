#!/usr/bin/env node

const path = require('path');

const dotenv = require('dotenv');
const fs = require('fs-extra');

function createAppConfigEnvFile(file) {
  const env = dotenv.config().parsed;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  fs.writeJSONSync(path.join(process.cwd(), file), env);
}

const filePath = process.argv.slice(2)[0];
if (!filePath) throw new Error('filePath is not defined');
createAppConfigEnvFile(filePath);
