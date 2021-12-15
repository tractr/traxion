import * as fs from 'fs';

import { getHapifyOptions } from './generate-config';

describe('generate config', () => {
  it('should throw an error when no hapify.json was found', async () => {
    await expect(async () => getHapifyOptions()).rejects.toThrow(
      `No hapify config found in ${process.cwd()} folder`,
    );
  });

  it('should generate the hapify.json file', async () => {
    const basePath = `${process.cwd()}/libs/hapify/generate-config`;

    const contentMainFile = {
      extends: ['libs/hapify/generate-config/tmp/generated/.hapifyrc.js'],
      templates: [],
    };

    const contentSecondFile = {
      templates: [
        {
          path: `test.ts`,
          engine: 'hpf',
        },
      ],
    };

    try {
      // create a tmp folder
      if (!fs.existsSync(`${basePath}/tmp`)) {
        fs.mkdirSync(`${basePath}/tmp`);
      }
      // create a tmp folder
      if (!fs.existsSync(`${basePath}/tmp/generated`)) {
        fs.mkdirSync(`${basePath}/tmp/generated`);
      }
      // create a tmp folder
      if (!fs.existsSync(`${basePath}/tmp/generated/hapify`)) {
        fs.mkdirSync(`${basePath}/tmp/generated/hapify`);
      }

      // create main .hapifyrc.js file
      fs.writeFileSync(
        `${basePath}/tmp/.hapifyrc.js`,
        `module.exports = ${JSON.stringify(contentMainFile)}`,
      );

      // create test file
      fs.writeFileSync(
        `${basePath}/tmp/generated/hapify/test.ts.hpf`,
        `this is a test file`,
      );
      // create second .hapifyrc file
      fs.writeFileSync(
        `${basePath}/tmp/generated/.hapifyrc.js`,
        `module.exports = ${JSON.stringify(contentSecondFile)}`,
      );

      await getHapifyOptions(`${basePath}/tmp`);

      const fileExist = fs.existsSync(`${basePath}/tmp/hapify.json`);

      expect(fileExist).toEqual(true);
    } catch (err: unknown) {
      throw console.error(err);
    } finally {
      if (fs.existsSync(`${basePath}/tmp`)) {
        fs.rmdirSync(`${basePath}/tmp`, { recursive: true });
      }
    }
  });
});
