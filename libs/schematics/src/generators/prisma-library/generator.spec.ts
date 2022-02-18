import { readJson, readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { NX_TOOLS_NX_PRISMA_PACKAGE } from './constants/nx-tools-prisma-package';
import generator from './generator';
import { PrismaLibraryGeneratorSchema } from './schema';

describe('prisma-library generator', () => {
  let appTree: Tree;
  const options: PrismaLibraryGeneratorSchema = {
    name: 'test',
    type: 'nest',
    hapifyTemplates: ['prisma'],
    hapifyModelsJson: 'hapify-models.json',
    hapifyAdditionalTemplates: '',
    hapifyUseImportReplacements: true,
    useSecondaryEndpoint: true,
    addSecondaryEndpoint: [],
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });

  it('should generate a .hapifyrc.js file', async () => {
    await generator(appTree, {
      ...options,
    });

    expect(appTree.exists('libs/test/.hapifyrc.js')).toBeTruthy();
    expect(appTree.read('libs/test/.hapifyrc.js')?.toString()).toEqual(`const {
  hapifyDefaultConfig,
  getValidatorPath,
} = require('@tractr/hapify-config');

module.exports = {
  ...hapifyDefaultConfig,
  version: '1',
  name: 'test',
  description: 'Library to host generated codes',
  validatorPath: getValidatorPath(__dirname),
  project: '../../hapify-models.json',
  extends: [
    '@tractr/hapify-templates-prisma',],
  importReplacements: {},
};
`);
  });

  it('should generate a prisma/seed.ts file', async () => {
    await generator(appTree, {
      ...options,
    });

    expect(appTree.exists('libs/test/prisma/seed.ts')).toBeTruthy();
    expect(appTree.read('libs/test/prisma/seed.ts')?.toString())
      .toEqual(`import { seed } from '../src/index';

seed().catch((e) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start the server. See the error below.');
  // eslint-disable-next-line no-console
  console.error(e);
});`);
  });

  it('should generate a prisma/schemas/base.prisma file', async () => {
    await generator(appTree, {
      ...options,
    });

    expect(appTree.exists('libs/test/prisma/schemas/base.prisma')).toBeTruthy();
    expect(appTree.read('libs/test/prisma/schemas/base.prisma')?.toString())
      .toEqual(`// ------------------------------------------------

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output = "../../../node_modules/.prisma/client"
  previewFeatures = ["filterJson"]
}
`);
  });

  it('should add @nx-tools/nx-prisma package', async () => {
    await generator(appTree, { ...options });

    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson.devDependencies).toBeDefined();
    expect(
      packageJson.devDependencies[NX_TOOLS_NX_PRISMA_PACKAGE],
    ).toBeDefined();
  });
});
