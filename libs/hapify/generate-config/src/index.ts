#!/usr/bin/node
import { getHapifyOptions } from './generate-config';

(async () => getHapifyOptions())().catch((err) => console.error(err));
