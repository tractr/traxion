import * as fs from 'fs';

import { ExecutorContext } from '@nrwl/devkit';

import runExecutor from './executor';
import { UpdateDependenciesExecutorSchema } from './schema';

jest.mock('@nrwl/devkit', () => ({ logger: { error: jest.fn() } }));

describe('runExecutor', () => {
  const mockContext = {
    root: '/path/to/root',
    cwd: '/path/to/project',
  } as ExecutorContext;

  const mockOptions: UpdateDependenciesExecutorSchema = {
    ignorePackages: [],
    overrides: {},
    packageJsonPath: 'package.json',
    peerDependenciesJsonPath: 'peer-dependencies.json',
  };

  const mockPackageJson = {
    peerDependencies: {
      'dependency-a': '1.0.0',
      'dependency-b': '1.0.0',
      'all/a': '1.0.0',
      'all/b': '1.0.0',
      'all/c': '1.0.0',
      'ignore-me': '1.0.0',
    },
  };

  const mockPeerDependenciesJson = {
    'dependency-a': '^2.0.0',
    'dependency-b': '^2.0.0',
    'all/a': '^3.0.0',
    'all/*': '^2.0.0',
    'all/b': '^3.0.0',
    'ignore-me': '^2.0.0',
    'other-a': '^2.0.0',
  };

  const defaultReturnValues = {
    peerDependencies: {
      'dependency-a': '^2.0.0',
      'dependency-b': '^2.0.0',
      'all/a': '^2.0.0',
      'all/b': '^3.0.0',
      'all/c': '^2.0.0',
      'ignore-me': '^2.0.0',
    },
  };

  let mockExistSync: jest.SpyInstance;
  let mockReadFileSync: jest.SpyInstance;
  let mockWriteFileSync: jest.SpyInstance;

  beforeEach(() => {
    mockExistSync = jest.spyOn(fs, 'existsSync');
    mockReadFileSync = jest.spyOn(fs, 'readFileSync');
    mockWriteFileSync = jest.spyOn(fs, 'writeFileSync');

    // Default mock when both package.json and peer-dependencies.json exist
    mockExistSync.mockReturnValue(true);
    mockWriteFileSync.mockReturnValue(undefined);
  });

  afterEach(() => {
    mockExistSync.mockClear();
    mockReadFileSync.mockClear();
    mockWriteFileSync.mockClear();
  });

  test('should update the package.json when both package.json and peer-dependencies.json exist', async () => {
    mockReadFileSync
      .mockReturnValueOnce(JSON.stringify(mockPeerDependenciesJson))
      .mockReturnValueOnce(JSON.stringify(mockPackageJson));
    const result = await runExecutor(mockOptions, mockContext);
    expect(result).toEqual({
      success: true,
    });
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      'package.json',
      JSON.stringify(defaultReturnValues, null, 2),
    );
  });

  test('should return failure if the package.json is not found', async () => {
    mockExistSync.mockReturnValueOnce(false);
    const result = await runExecutor(mockOptions, mockContext);
    expect(result).toEqual({
      success: false,
    });
    expect(mockWriteFileSync).not.toHaveBeenCalled();
  });

  test('should return success if the package.json does not contain peerDependencies', async () => {
    mockReadFileSync
      .mockReturnValueOnce(JSON.stringify(mockPeerDependenciesJson))
      .mockReturnValueOnce(JSON.stringify({}));
    const result = await runExecutor(mockOptions, mockContext);
    expect(result).toEqual({
      success: true,
    });
    expect(mockWriteFileSync).not.toHaveBeenCalled();
  });

  test('should return failure if an invalid version is found', async () => {
    mockReadFileSync
      .mockReturnValueOnce(
        JSON.stringify({
          ...mockPeerDependenciesJson,
          'all/*': 'invalid',
        }),
      )
      .mockReturnValueOnce(
        JSON.stringify({
          ...mockPackageJson,
        }),
      );
    const result = await runExecutor(mockOptions, mockContext);
    expect(result).toEqual({
      success: false,
    });
    expect(mockWriteFileSync).not.toHaveBeenCalled();
  });

  test('should not update ignored packages in package.json', async () => {
    mockReadFileSync
      .mockReturnValueOnce(JSON.stringify(mockPeerDependenciesJson))
      .mockReturnValueOnce(JSON.stringify(mockPackageJson));
    const result = await runExecutor(
      { ...mockOptions, ignorePackages: ['ignore-me'] },
      mockContext,
    );
    expect(result).toEqual({
      success: true,
    });
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      'package.json',
      JSON.stringify(
        {
          ...defaultReturnValues,
          peerDependencies: {
            ...defaultReturnValues.peerDependencies,
            'ignore-me': '1.0.0',
          },
        },
        null,
        2,
      ),
    );
  });

  test('should update packages with overrides', async () => {
    mockReadFileSync
      .mockReturnValueOnce(JSON.stringify(mockPeerDependenciesJson))
      .mockReturnValueOnce(JSON.stringify(mockPackageJson));

    const result = await runExecutor(
      {
        ...mockOptions,
        overrides: {
          'all/*': '^4.0.0',
          'other-package': '4.0.0',
        },
      },
      mockContext,
    );
    expect(result).toEqual({
      success: true,
    });
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      'package.json',
      JSON.stringify(
        {
          ...defaultReturnValues,
          peerDependencies: {
            ...defaultReturnValues.peerDependencies,
            'all/a': '^4.0.0',
            'all/b': '^3.0.0',
            'all/c': '^4.0.0',
          },
        },
        null,
        2,
      ),
    );
  });
});
