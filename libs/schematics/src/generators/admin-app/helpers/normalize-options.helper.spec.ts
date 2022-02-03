import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { AdminAppGeneratorSchema } from '../schema';
import { NormalizedSchema, normalizeOptions } from './normalize-options.helper';

describe('normalizeOptions', () => {
  let tree: Tree;
  const npmScope = 'tractr';
  const defaultOptions: AdminAppGeneratorSchema = {
    name: 'admin',
    npmName: '@tractr/admin',
    reactAdminImportPath: '@tractr/react-admin',
    rextClientImportPath: '@tractr/rext-client',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree.write('nx.json', `{ "npmScope": "${npmScope}" }`);
  });

  it('should get project npmScope', () => {
    const options: AdminAppGeneratorSchema = {
      ...defaultOptions,
    };

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      npmScope,
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
    const options: AdminAppGeneratorSchema = {
      ...defaultOptions,
      ...extraKeys,
    };

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      npmScope,
      extra: extraKeys,
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });

  it('should normalize name', () => {
    const options: AdminAppGeneratorSchema = {
      ...defaultOptions,
      name: 'testAdmin',
    };

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      npmScope,
      name: 'test-admin',
      extra: {},
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });

  it('should normalize directory if it exists', () => {
    const options: AdminAppGeneratorSchema = {
      ...defaultOptions,
      directory: 'testDirectory',
    };

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      directory: 'test-directory',
      npmScope,
      extra: {},
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });

  it('should generate a "npmName" if none is provided', () => {
    const options: AdminAppGeneratorSchema = {
      ...defaultOptions,
      npmName: undefined,
    };

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      npmName: '@tractr/admin',
      npmScope,
      extra: {},
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });

  it('should generate a "npmName" if none is provided, and use the directory', () => {
    const options: AdminAppGeneratorSchema = {
      ...defaultOptions,
      directory: 'test',
      npmName: undefined,
    };

    const normalizedSchema: NormalizedSchema = {
      ...defaultOptions,
      directory: 'test',
      npmName: '@tractr/test-admin',
      npmScope,
      extra: {},
    };

    const result = normalizeOptions(tree, options);

    expect(result).toEqual(normalizedSchema);
  });
});
