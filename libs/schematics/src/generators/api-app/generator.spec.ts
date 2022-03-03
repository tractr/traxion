import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import generator from './generator';
import { ApiAppGeneratorSchema } from './schema';

describe('api-app generator', () => {
  let appTree: Tree;
  const options: ApiAppGeneratorSchema = {
    name: 'test',
    generatedDir: 'generated',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
