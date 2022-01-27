import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

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

    // console.log(appTree);
    // const config = readProjectConfiguration(appTree, 'test');
    // expect(config).toBeDefined();
  });
});
