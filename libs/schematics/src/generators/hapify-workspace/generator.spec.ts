import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import generator from './generator';
import { HapifyWorkspaceGeneratorSchema } from './schema';

describe('hapify-workspace generator', () => {
  let appTree: Tree;
  const options: HapifyWorkspaceGeneratorSchema = { name: 'test1' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'generated-prisma');
    expect(config).toBeDefined();
  }, 10000);
});
