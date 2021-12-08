import * as fs from 'fs';

import { hapifyUpdateTemplatesImportPath } from './update-templates-import-path';

describe('update templates import path', () => {
  it('should throw an error when no hapify.json was found', async () => {
    await expect(async () => hapifyUpdateTemplatesImportPath()).rejects.toThrow(
      `No hapify config found in ${process.cwd()} folder`,
    );
  });

  it('should replace the content of a file', async () => {
    const basePath = `${process.cwd()}/libs/hapify/update-templates-import-path/src`;
    const content = {
      importReplacements: {
        models: '@tractr/test',
      },
    };
    // create .hapifyrc.js file
    fs.writeFileSync(
      `${basePath}/.hapifyrc.js`,
      `module.exports = ${JSON.stringify(content)}`,
    );

    // create a basic ts file in generated folder
    if (!fs.existsSync(`${basePath}/generated`)) {
      fs.mkdirSync(`${basePath}/generated`);
    }
    const contentFile = `import test from '../models';`;
    fs.writeFileSync(`${basePath}/generated/test.ts`, contentFile);

    await hapifyUpdateTemplatesImportPath(`${basePath}/generated`, basePath);

    expect(
      fs.readFileSync(`${basePath}/generated/test.ts`).includes('@tractr/test'),
    ).toEqual(true);

    // clean files/dir
    fs.unlinkSync(`${basePath}/.hapifyrc.js`);
    fs.unlinkSync(`${basePath}/generated/test.ts`);
    fs.rmdirSync(`${basePath}/generated`);
  });
});
