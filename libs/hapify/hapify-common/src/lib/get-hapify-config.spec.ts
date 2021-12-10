import * as fs from 'fs';
import * as fsp from 'fs/promises';

import * as uuid from 'uuid';
import * as yaml from 'yaml';

import { getHapifyConfig } from './get-hapify-config';

const BASE_PATH = `${process.cwd()}/libs/hapify/hapify-common`;

describe('get hapify config', () => {
  async function deleteFilesAndFolders() {
    if (fs.existsSync(`${BASE_PATH}/tmp`)) {
      await fsp.rmdir(`${BASE_PATH}/tmp`, { recursive: true });
    }
  }

  beforeEach(async () => deleteFilesAndFolders());

  afterEach(async () => deleteFilesAndFolders());

  it('should return empty object if main config does not contains templates key and has no children', async () => {
    const basePath = BASE_PATH;
    const randomString = uuid.v4();

    const contentMainFile = {};

    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp`)) {
      await fsp.mkdir(`${basePath}/tmp`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}`);
    }
    // create config hapify file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/.hapifyrc.js`,
      `${JSON.stringify(contentMainFile)}`,
    );

    const result = await getHapifyConfig(`${basePath}/tmp/${randomString}`);

    expect(result).toEqual({});
  });

  it('package.json should return hapify config with good properties', async () => {
    const basePath = BASE_PATH;
    const randomString = uuid.v4();

    const contentMainFile = {
      hapify: {
        extends: 'hapify/config.js',
        templates: [
          {
            path: `test.ts`,
            engine: 'hpf',
          },
        ],
      },
    };

    const contentSecondFile = {
      templates: [
        {
          path: `test.ts`,
          engine: 'hpf',
        },
      ],
    };

    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp`)) {
      await fsp.mkdir(`${basePath}/tmp`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}/hapify`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}/hapify`);
    }
    // create config hapify file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/package.json`,
      `${JSON.stringify(contentMainFile)}`,
    );
    // create second config file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/hapify/config.js`,
      `module.exports = ${JSON.stringify(contentSecondFile)}`,
    );

    const result = await getHapifyConfig(`${basePath}/tmp/${randomString}`);

    expect(Object.keys(result || {})).toEqual(
      expect.arrayContaining(['templates', 'extends']),
    );
  });

  it('hapify.json should return hapify config with good properties', async () => {
    const basePath = BASE_PATH;
    const randomString = uuid.v4();

    const contentMainFile = {
      default: {
        extends: ['hapify/config.js'],
        templates: [
          {
            path: `test.ts`,
            engine: 'hpf',
          },
        ],
        defaultFields: {
          name: 'id',
        },
      },
    };

    const contentSecondFile = {
      templates: [
        {
          path: `test.ts`,
          engine: 'hpf',
        },
      ],
      defaultFields: {
        name: 'id',
      },
      extends: ['../config.js'],
    };

    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp`)) {
      await fsp.mkdir(`${basePath}/tmp`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}/hapify`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}/hapify`);
    }
    // create config hapify file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/hapify.json`,
      `${JSON.stringify(contentMainFile)}`,
    );
    // create second config file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/hapify/config.js`,
      `module.exports = ${JSON.stringify(contentSecondFile)}`,
    );

    const result = await getHapifyConfig(`${basePath}/tmp/${randomString}`);

    expect(Object.keys(result || {})).toEqual(
      expect.arrayContaining(['templates', 'extends']),
    );
  });

  it('package.json with no hapify key must return null', async () => {
    const basePath = BASE_PATH;
    const randomString = uuid.v4();

    const contentMainFile = {
      extends: ['hapify/config.js'],
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

    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp`)) {
      await fsp.mkdir(`${basePath}/tmp`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}/hapify`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}/hapify`);
    }
    // create config hapify file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/package.json`,
      `${JSON.stringify(contentMainFile)}`,
    );
    // create second config file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/hapify/config.js`,
      `module.exports = ${JSON.stringify(contentSecondFile)}`,
    );

    const result = await getHapifyConfig(`${basePath}/tmp/${randomString}`);
    expect(result).toEqual(null);
  });

  it('.hapifyrc.yml should return hapify config with good properties', async () => {
    const basePath = BASE_PATH;
    const randomString = uuid.v4();

    const contentMainFile = {
      extends: ['hapify/.hapifyrc.js', 'hapify/test.js'],
      templates: [],
    };

    const yamlContentMainFile = new yaml.Document();
    yamlContentMainFile.contents = contentMainFile;

    const contentSecondFile = {
      templates: [
        {
          path: `test.ts`,
          engine: 'hpf',
        },
      ],
    };

    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp`)) {
      await fsp.mkdir(`${basePath}/tmp`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}/hapify`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}/hapify`);
    }
    // create main hapify config file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/.hapifyrc.yml`,
      `${yamlContentMainFile.toString()}`,
    );
    // create second hapify config file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/hapify/.hapifyrc.js`,
      `module.exports = ${JSON.stringify(contentSecondFile)}`,
    );

    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/hapify/test.js`,
      `module.exports = ${JSON.stringify(contentSecondFile)}`,
    );
    // we are testing to ignore the second file
    const result = await getHapifyConfig(`${basePath}/tmp/${randomString}`, [
      `${basePath}/tmp/${randomString}/hapify/test.js`,
    ]);

    expect(Object.keys(result || {})).toEqual(
      expect.arrayContaining(['templates', 'extends']),
    );
  });

  it('hapify config with unkown extension', async () => {
    const basePath = BASE_PATH;
    const randomString = uuid.v4();

    const contentMainFile = {
      extends: ['hapify/.hapifyrc.js'],
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

    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp`)) {
      await fsp.mkdir(`${basePath}/tmp`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}`);
    }
    // create a tmp folder
    if (!fs.existsSync(`${basePath}/tmp/${randomString}/hapify`)) {
      await fsp.mkdir(`${basePath}/tmp/${randomString}/hapify`);
    }
    // create main hapify config file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/config.ext`,
      `${JSON.stringify(contentMainFile)}`,
    );
    // create second hapify config file
    await fsp.writeFile(
      `${basePath}/tmp/${randomString}/hapify/.hapifyrc.js`,
      `module.exports = ${JSON.stringify(contentSecondFile)}`,
    );

    const result = await getHapifyConfig(`${basePath}/tmp/${randomString}`);

    expect(result).toEqual(null);
  });

  it('default path should return null in the jest case', async () => {
    const result = await getHapifyConfig();

    expect(result).toEqual(null);
  });
});
