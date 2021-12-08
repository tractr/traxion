import * as fs from 'fs';

import { getHapifyOptions } from './generate-config';

describe('generate config', () => {
  it('should throw an error when no hapify.json was found', async () => {
    await expect(async () => getHapifyOptions()).rejects.toThrow(
      `No hapify config found in ${process.cwd()} folder`,
    );
  });

  it('should generate the hapify.json file', async () => {
    const basePath = `${process.cwd()}/libs/hapify/generate-config/src`;
    const content = {
      templates: [],
    };
    // create hapify.json file
    fs.writeFileSync(
      `${basePath}/.hapifyrc.js`,
      `module.exports = ${JSON.stringify(content)}`,
    );

    await getHapifyOptions(basePath);

    const fileExist = fs.existsSync(`${basePath}/hapify.json`);

    expect(fileExist).toEqual(true);

    fs.unlinkSync(`${basePath}/hapify.json`);
    fs.unlinkSync(`${basePath}/.hapifyrc.js`);
  });
});
