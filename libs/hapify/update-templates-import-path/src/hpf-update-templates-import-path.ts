#!/usr/bin/env node

import { hapifyUpdateTemplatesImportPath } from './update-templates-import-path';

(async () => hapifyUpdateTemplatesImportPath())().catch((err) =>
  console.error(err),
);
