import * as fs from 'fs';
import * as fsp from 'fs/promises';

import * as uuid from 'uuid';

import { hapifyUpdateTemplatesImportPath } from './update-templates-import-path';

const BASE_PATH = `${process.cwd()}/libs/hapify/update-templates-import-path`;

describe('update templates import path', () => {
  async function deleteFilesAndFolders() {
    if (fs.existsSync(`${BASE_PATH}/tmp`)) {
      await fsp.rmdir(`${BASE_PATH}/tmp`, { recursive: true });
    }
  }

  beforeEach(async () => deleteFilesAndFolders());

  afterEach(async () => deleteFilesAndFolders());

  it('should throw an error when no hapify.json was found', async () => {
    await expect(async () => hapifyUpdateTemplatesImportPath()).rejects.toThrow(
      `No hapify config found in ${process.cwd()} folder`,
    );
  });

  it('should replace the content of a file', async () => {
    const basePath = BASE_PATH;
    const randomString = uuid.v4();
    const pattern = '@tractr/test';
    const content = {
      importReplacements: {
        models: pattern,
      },
      templates: [],
    };

    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp`)) {
      await fsp.mkdir(`${basePath}/tmp`);
    }
    // create a random subfolder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}`);
    }

    // create .hapifyrc.js file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/.hapifyrc.js`,
      `module.exports = ${JSON.stringify(content)}`,
    );

    const contentFile = `import test from '../models';`;
    await fsp.writeFile(`${basePath}/tmp/${randomString}/test.ts`, contentFile);

    await hapifyUpdateTemplatesImportPath(
      `${basePath}/tmp/${randomString}`,
      `${basePath}/tmp/${randomString}`,
    );

    expect(
      fs
        .readFileSync(`${basePath}/tmp/${randomString}/test.ts`)
        .includes(pattern),
    ).toEqual(true);
  });

  it('should failed because hapify config has no importReplacementsKeys', async () => {
    const basePath = BASE_PATH;
    const randomString = uuid.v4();
    const pattern = '@tractr/test';
    const content = {
      notTheGoodKey: {
        models: pattern,
      },
      templates: [],
    };

    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp`)) {
      await fsp.mkdir(`${basePath}/tmp`);
    }
    // create a random subfolder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}`);
    }

    // create .hapifyrc.js file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/.hapifyrc.js`,
      `module.exports = ${JSON.stringify(content)}`,
    );

    await expect(async () =>
      hapifyUpdateTemplatesImportPath(
        `${basePath}/tmp/${randomString}`,
        `${basePath}/tmp/${randomString}`,
      ),
    ).rejects.toThrow(`No importReplacements key found in hapify config`);
  });
});
