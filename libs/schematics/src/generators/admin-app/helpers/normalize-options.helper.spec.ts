import { getWorkspaceLayout, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { NormalizedSchema, normalizeOptions } from './normalize-options.helper';
import {
  AdminAppGeneratorSchema,
  AdminAppGeneratorSchemaWithExtra,
} from '../schema';

describe('normalizeOptions', () => {
  let tree: Tree;
  const npmScope = 'trxn';
  const defaultOptions: AdminAppGeneratorSchema = {
    name: 'admin',
    npmName: '@trxn/admin',
    reactAdminImportPath: '@trxn/react-admin',
    rextClientImportPath: '@trxn/rext-client',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree.write('nx.json', `{ "npmScope": "${npmScope}" }`);
  });

  it('should get project npmScope', () => {
    const options: AdminAppGeneratorSchemaWithExtra = {
      ...defaultOptions,
    };

    const { appsDir } = getWorkspaceLayout(tree);

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      npmScope,
      projectRoot: `${appsDir === '.' ? '' : `${appsDir}/`}admin`,
      projectName: 'admin',
      projectDirectory: 'admin',
      extra: {},
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });

  it('should store extra keys in the extra property', () => {
    const extraKeys = {
      extra1: 'extra1',
      extra2: 'extra2',
    };
    const options: AdminAppGeneratorSchemaWithExtra = {
      ...defaultOptions,
      ...extraKeys,
    };

    const { appsDir } = getWorkspaceLayout(tree);

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      npmScope,
      projectRoot: `${appsDir === '.' ? '' : `${appsDir}/`}admin`,
      projectName: 'admin',
      projectDirectory: 'admin',
      extra: extraKeys,
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });

  it('should normalize name', () => {
    const options: AdminAppGeneratorSchemaWithExtra = {
      ...defaultOptions,
      name: 'testAdmin',
    };

    const { appsDir } = getWorkspaceLayout(tree);

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      npmScope,
      projectRoot: `${appsDir === '.' ? '' : `${appsDir}/`}test-admin`,
      projectName: 'test-admin',
      projectDirectory: 'test-admin',
      name: 'test-admin',
      extra: {},
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });

  it('should normalize directory if it exists', () => {
    const options: AdminAppGeneratorSchemaWithExtra = {
      ...defaultOptions,
      directory: 'testDirectory',
    };

    const { appsDir } = getWorkspaceLayout(tree);

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      directory: 'test-directory',
      npmScope,
      projectRoot: `${
        appsDir === '.' ? '' : `${appsDir}/`
      }test-directory/admin`,
      projectName: 'test-directory-admin',
      projectDirectory: 'test-directory/admin',
      extra: {},
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });

  it('should generate a "npmName" if none is provided', () => {
    const options: AdminAppGeneratorSchemaWithExtra = {
      ...defaultOptions,
      npmName: undefined,
    };

    const { appsDir } = getWorkspaceLayout(tree);

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      npmName: '@trxn/admin',
      npmScope,
      projectRoot: `${appsDir === '.' ? '' : `${appsDir}/`}admin`,
      projectName: 'admin',
      projectDirectory: 'admin',
      extra: {},
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });

  it('should generate a "npmName" if none is provided, and use the directory', () => {
    const options: AdminAppGeneratorSchemaWithExtra = {
      ...defaultOptions,
      directory: 'test',
      npmName: undefined,
    };

    const { appsDir } = getWorkspaceLayout(tree);

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      directory: 'test',
      npmName: '@trxn/test-admin',
      npmScope,
      projectRoot: `${appsDir === '.' ? '' : `${appsDir}/`}test/admin`,
      projectName: 'test-admin',
      projectDirectory: 'test/admin',
      extra: {},
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });
});
