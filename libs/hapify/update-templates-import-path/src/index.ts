#!/usr/bin/node

import { hapifyUpdateTemplatesImportPath } from './update-templates-import-path';

(async () => hapifyUpdateTemplatesImportPath())().catch((err) => err);
