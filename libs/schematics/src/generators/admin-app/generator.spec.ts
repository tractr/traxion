import {
  getWorkspaceLayout,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as ReactGenerators from '@nrwl/react';
import fetch, { Response } from 'node-fetch';

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

jest.mock('node-fetch');

describe('admin generator', () => {
  let appTree: Tree;

  const options: AdminAppGeneratorSchemaWithExtra = {
    name: 'admin',
    reactAdminImportPath: '@trxn/react-admin',
    rextClientImportPath: '@trxn/rext-client',
  };

  const reactGenerator = jest.spyOn(ReactGenerators, 'applicationGenerator');
  const normalizeOptions = jest.spyOn(helpers, 'normalizeOptions');
  const cleanApplication = jest.spyOn(helpers, 'cleanApplication');
  const addFiles = jest.spyOn(helpers, 'addFiles');

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();

    appTree.write('nx.json', `{ "npmScope": "trxn" }`);

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            'dist-tags': { latest: '1.0.0' },
          }),
      }) as unknown as Promise<Response>,
    );

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

    const { root } = readProjectConfiguration(appTree, 'admin');

    expect(applicationConfiguration.targets?.serve.options.proxyConfig).toEqual(
      `${root}/proxy.conf.js`,
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
