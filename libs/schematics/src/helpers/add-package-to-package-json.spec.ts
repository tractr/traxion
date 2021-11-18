import { readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { addPackageToPackageJson } from './add-package-to-package-json';
import { getLatestPackageVersion } from './get-latest-package-version';

import { PackageType } from '.';

jest.mock('./get-latest-package-version');

describe('addPackageToPackageJson', () => {
  const mockGetLatestPackageVersion =
    getLatestPackageVersion as jest.MockedFunction<
      typeof getLatestPackageVersion
    >;
  const npmRegistry = 'https://registry.npmjs.org';

  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    mockGetLatestPackageVersion.mockReset();
  });

  it('should work with a string as packageName', async () => {
    mockGetLatestPackageVersion.mockReturnValueOnce(Promise.resolve('1.1.1'));
    expect(Array.isArray(await addPackageToPackageJson(tree, 'test'))).toBe(
      true,
    );
    expect(readJson(tree, 'package.json').devDependencies.test).toEqual(
      '1.1.1',
    );
  });

  it('sould work with a packageDefinitions', async () => {
    mockGetLatestPackageVersion.mockReturnValueOnce(Promise.resolve('1.1.1'));
    expect(
      Array.isArray(
        await addPackageToPackageJson(tree, { packageName: 'test' }),
      ),
    ).toBe(true);
    expect(readJson(tree, 'package.json').devDependencies.test).toEqual(
      '1.1.1',
    );
  });

  it('sould work with an array of string and packageDefinitions', async () => {
    mockGetLatestPackageVersion.mockReturnValue(Promise.resolve('1.1.1'));
    expect(
      Array.isArray(
        await addPackageToPackageJson(tree, [
          'test1',
          { packageName: 'test2' },
          { packageName: 'test3' },
        ]),
      ),
    ).toBe(true);
    expect(readJson(tree, 'package.json').devDependencies.test1).toEqual(
      '1.1.1',
    );
    expect(readJson(tree, 'package.json').devDependencies.test2).toEqual(
      '1.1.1',
    );
    expect(readJson(tree, 'package.json').devDependencies.test3).toEqual(
      '1.1.1',
    );
  });

  it('sould work with packageDefinitions with options', async () => {
    mockGetLatestPackageVersion.mockReturnValue(Promise.resolve('1.1.1'));
    expect(
      Array.isArray(
        await addPackageToPackageJson(tree, [
          { packageName: 'test1', version: '1.0.0' },
          { packageName: 'test2', registry: npmRegistry },
          { packageName: 'test3', type: PackageType.dependencies },
          { packageName: 'test4', type: PackageType.devDependencies },
          {
            packageName: 'test5',
            type: PackageType.dependencies,
            version: '1.0.0',
          },
        ]),
      ),
    ).toBe(true);
    expect(mockGetLatestPackageVersion).toHaveBeenCalledTimes(3);

    expect(readJson(tree, 'package.json').devDependencies.test1).toEqual(
      '1.0.0',
    );
    expect(readJson(tree, 'package.json').devDependencies.test2).toEqual(
      '1.1.1',
    );
    expect(readJson(tree, 'package.json').dependencies.test3).toEqual('1.1.1');
    expect(readJson(tree, 'package.json').devDependencies.test4).toEqual(
      '1.1.1',
    );
    expect(readJson(tree, 'package.json').dependencies.test5).toEqual('1.0.0');
  });

  it('should throw an error if we try to use a wrong registry', async () => {
    mockGetLatestPackageVersion.mockImplementation(() => {
      throw new Error();
    });

    await expect(async () =>
      addPackageToPackageJson(tree, { packageName: 'test', registry: 'test' }),
    ).rejects.toThrowError();
  });
});
