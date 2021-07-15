#!/usr/bin/node

import { createAppConfigEnvFile } from './build-app-config';

const filePath = process.argv.slice(2)[0];

if (!filePath) throw new Error('filePath is not defined');

createAppConfigEnvFile(filePath);
