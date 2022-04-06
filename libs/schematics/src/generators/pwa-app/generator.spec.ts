import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import generator from './generator';
import { PwaAppGeneratorSchema } from './schema';

describe('pwa-app generator', () => {
  let appTree: Tree;
  const options: PwaAppGeneratorSchema = {
    name: 'test',
    apiName: 'api',
    generatedDir: 'generated',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
    appTree.write('.gitignore', '');
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});