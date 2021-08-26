import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import generator from './generator';
import { ReleaseGeneratorSchema } from './schema';

describe('release generator', () => {
  let appTree: Tree;
  const options: ReleaseGeneratorSchema = {
    project: 'test',
    repository: 'https://github.com/tractr/stack',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
