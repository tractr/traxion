import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as ReactGenerators from '@nrwl/react';

import generator from './generator';
import * as helpers from './helpers';
import { AdminAppGeneratorSchemaWithExtra } from './schema';

jest.mock('@nrwl/react', () => ({
  __esModule: true,
  ...jest.requireActual('@nrwl/react'),
}));

jest.mock('./helpers', () => ({
  __esModule: true,
  ...jest.requireActual('./helpers'),
}));

describe('admin generator', () => {
  let appTree: Tree;

  const options: AdminAppGeneratorSchemaWithExtra = {
    name: 'admin',
    reactAdminImportPath: '@tractr/react-admin',
    rextClientImportPath: '@tractr/rext-client',
  };

  const reactGenerator = jest.spyOn(ReactGenerators, 'applicationGenerator');
  const normalizeOptions = jest.spyOn(helpers, 'normalizeOptions');
  const cleanApplication = jest.spyOn(helpers, 'cleanApplication');
  const addFiles = jest.spyOn(helpers, 'addFiles');

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();

    appTree.write('nx.json', `{ "npmScope": "tractr" }`);

    jest.clearAllMocks();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'admin');
    expect(config).toBeDefined();
  });

  it('should normalize options properly', async () => {
    await generator(appTree, options);

    expect(normalizeOptions).toHaveBeenCalledTimes(1);
  });

  it('should use react application generator', async () => {
    await generator(appTree, options);

    expect(reactGenerator).toHaveBeenCalledTimes(1);
  });

  it('should add proxy configuration to the application configuration', async () => {
    await generator(appTree, options);

    const applicationConfiguration = readProjectConfiguration(
      appTree,
      options.name,
    );

    expect(applicationConfiguration.targets?.serve.options.proxyConfig).toEqual(
      'apps/admin/proxy.conf.js',
    );
  });

  it('should clean useless files in generated application', async () => {
    await generator(appTree, options);

    expect(cleanApplication).toHaveBeenCalledTimes(1);
  });

  it('should generate static files', async () => {
    await generator(appTree, options);

    expect(addFiles).toHaveBeenCalledTimes(1);
  });
});
