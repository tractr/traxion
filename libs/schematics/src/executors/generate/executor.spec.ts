import { exec } from 'child_process';

import {
  ExecutorContext,
  logger,
  NxJsonConfiguration,
  WorkspaceJsonConfiguration,
} from '@nrwl/devkit';
import * as fs from 'fs-extra';

import executor from './executor';
import { GenerateExecutorSchema } from './schema';

import * as hapifyCommon from '@tractr/hapify-common';
import * as hapifyGenerateConfig from '@tractr/hapify-generate-config';
import * as hapifyUpdateTemplates from '@tractr/hapify-update-templates-import-path';

jest.mock('child_process');
jest.mock('@tractr/hapify-generate-config', () => ({
  __esModule: true,
  ...jest.requireActual('@tractr/hapify-generate-config'),
}));
jest.mock('@tractr/hapify-update-templates-import-path', () => ({
  __esModule: true,
  ...jest.requireActual('@tractr/hapify-update-templates-import-path'),
}));
jest.mock('@tractr/hapify-common', () => ({
  __esModule: true,
  ...jest.requireActual('@tractr/hapify-common'),
}));

describe('Generate executor:generate', () => {
  let defaultContext: ExecutorContext;
  let defaultOptions: GenerateExecutorSchema;
  let execSpy: jest.SpyInstance;

  // nrwl devkit
  let loggerSpy: jest.SpyInstance;

  // fs
  let pathExists: jest.SpyInstance;
  let remove: jest.SpyInstance;
  let copy: jest.SpyInstance;
  let readdir: jest.SpyInstance;
  let packageJson: { name: string };
  let packageJsonName: jest.Mock;

  // tractr
  let getHapifyOptions: jest.SpyInstance;
  let processImportReplacements: jest.SpyInstance;
  let getHapifyConfig: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();

    // Default options and context
    defaultContext = {
      root: '/root',
      cwd: '/cwd',
      isVerbose: false,
      workspace: {} as WorkspaceJsonConfiguration &
        NxJsonConfiguration<'*' | string[]>,
    };
    defaultOptions = {
      cwd: 'libs/test',
      format: true,
      outputGeneratedPath: 'generated',
      inputHapifyGeneratedPath: 'generated',
      cleanFirst: true,
      moveGeneratedFiles: true,
      updateImportPath: true,
      secondaryEntrypoints: ['mock'],
    };
    // node child_process
    execSpy = exec as jest.MockedFunction<typeof exec>;

    // fs
    pathExists = jest.spyOn(fs, 'pathExists');
    remove = jest.spyOn(fs, 'remove');
    copy = jest.spyOn(fs, 'copy');
    readdir = jest.spyOn(fs, 'readdir');
    packageJsonName = jest.fn();
    packageJson = {
      get name() {
        return packageJsonName();
      },
    };

    // nrwl devkit
    loggerSpy = jest.spyOn(logger, 'debug');
    jest.spyOn(console, 'debug').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();

    // tractr
    getHapifyOptions = jest.spyOn(hapifyGenerateConfig, 'getHapifyOptions');
    processImportReplacements = jest.spyOn(
      hapifyUpdateTemplates,
      'processImportReplacements',
    );
    getHapifyConfig = jest.spyOn(hapifyCommon, 'getHapifyConfig');

    // Mock the default return values
    pathExists.mockReturnValue(Promise.resolve(true));
    remove.mockReturnValue(Promise.resolve(true));
    getHapifyOptions.mockReturnValue(Promise.resolve(true));
    getHapifyConfig.mockReturnValue(
      Promise.resolve({
        importReplacements: [],
      }),
    );
    execSpy.mockImplementationOnce((_cmd, _options, cb) =>
      cb(null, { stdout: '', stderr: '' }),
    );
    readdir.mockReturnValueOnce(Promise.resolve(['template']));
    readdir.mockReturnValue(Promise.resolve(['mock', 'src', 'test']));
    copy.mockReturnValue(Promise.resolve(true));
    processImportReplacements.mockReturnValue(Promise.resolve(true));
    execSpy.mockImplementationOnce((_cmd, cb) =>
      cb(null, { stdout: '', stderr: '' }),
    );
    jest.mock('/root/libs/test/package.json', () => packageJson, {
      virtual: true,
    });
    packageJsonName.mockReturnValue('@test/generated');
  });

  it('should execute all the action when the default options are used', async () => {
    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(pathExists).toHaveBeenNthCalledWith(1, '/root/libs/test/src');
    expect(pathExists).toHaveBeenNthCalledWith(2, '/root/libs/test/mock');
    expect(pathExists).toHaveBeenNthCalledWith(3, '/root/libs/test');

    expect(remove).toHaveBeenCalledTimes(7);
    expect(remove).toHaveBeenNthCalledWith(1, '/root/libs/test/generated');
    expect(remove).toHaveBeenNthCalledWith(2, '/root/libs/test/src/generated');
    expect(remove).toHaveBeenNthCalledWith(
      3,
      '/root/libs/test/mock/src/generated',
    );
    expect(remove).toHaveBeenNthCalledWith(
      4,
      '/root/libs/test/src/generated/template/mock',
    );
    expect(remove).toHaveBeenNthCalledWith(
      5,
      '/root/libs/test/mock/src/generated/template/src',
    );
    expect(remove).toHaveBeenNthCalledWith(
      6,
      '/root/libs/test/mock/src/generated/template/test',
    );
    expect(remove).toHaveBeenNthCalledWith(7, '/root/libs/test/generated');

    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(getHapifyOptions).toHaveBeenCalledWith('/root/libs/test');

    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(execSpy).toHaveBeenNthCalledWith(
      1,
      'npx hpf generate',
      {
        cwd: '/root/libs/test',
      },
      expect.any(Function),
    );

    expect(copy).toHaveBeenCalledTimes(2);
    expect(copy).toHaveBeenNthCalledWith(
      1,
      '/root/libs/test/generated',
      '/root/libs/test/src/generated',
    );
    expect(copy).toHaveBeenNthCalledWith(
      2,
      '/root/libs/test/generated',
      '/root/libs/test/mock/src/generated',
    );

    expect(processImportReplacements).toHaveBeenCalledTimes(2);
    expect(processImportReplacements).toHaveBeenNthCalledWith(
      1,
      '/root/libs/test/src/generated',
      {},
    );
    expect(processImportReplacements).toHaveBeenNthCalledWith(
      2,
      '/root/libs/test/mock/src/generated',
      { template: '@test/generated', '': '@test/generated' },
    );

    expect(execSpy).toHaveBeenNthCalledWith(
      2,
      `npx prettier '/root/libs/test/{src,mock}/generated/**/*.ts' --write`,
      expect.any(Function),
    );
    expect(output).toEqual({ success: true });
  });

  it('log when we use verbose params', async () => {
    execSpy.mockReset();
    execSpy.mockImplementationOnce((_cmd, _options, cb) =>
      cb(null, { stdout: 'Hapify generation success', stderr: '' }),
    );
    execSpy.mockImplementationOnce((_cmd, cb) =>
      cb(null, { stdout: '', stderr: '' }),
    );

    const output = await executor(defaultOptions, {
      ...defaultContext,
      isVerbose: true,
    });

    expect(loggerSpy).toHaveBeenCalledTimes(8);
    expect(loggerSpy).toHaveBeenNthCalledWith(
      1,
      'Check if /root/libs/test exists',
    );
    expect(loggerSpy).toHaveBeenNthCalledWith(2, 'Cleaning files');
    expect(loggerSpy).toHaveBeenNthCalledWith(
      3,
      'Generating the configuration files',
    );
    expect(loggerSpy).toHaveBeenNthCalledWith(4, 'Generating the hapify files');
    expect(loggerSpy).toHaveBeenNthCalledWith(5, 'Hapify generation success');
    expect(loggerSpy).toHaveBeenNthCalledWith(
      6,
      'Moving the generated files from generated',
    );
    expect(loggerSpy).toHaveBeenNthCalledWith(
      7,
      'Updating the templates import path',
    );
    expect(loggerSpy).toHaveBeenNthCalledWith(
      8,
      'Formating the generated files:',
      'src,mock',
    );

    expect(output).toEqual({ success: true });
  });

  it('should fail the execution early if the dest folder doest not exists', async () => {
    pathExists.mockReset();
    pathExists.mockReturnValueOnce(Promise.resolve(false));
    let output;

    try {
      output = await executor(defaultOptions, defaultContext);
    } catch (err: unknown) {
      if (!(err instanceof Error)) throw err;

      output = err.message;
    }

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(pathExists).toHaveBeenCalledWith('/root/libs/test');

    expect(remove).toHaveBeenCalledTimes(0);
    expect(getHapifyOptions).toHaveBeenCalledTimes(0);
    expect(execSpy).toHaveBeenCalledTimes(0);
    expect(copy).toHaveBeenCalledTimes(0);
    expect(processImportReplacements).toHaveBeenCalledTimes(0);
    expect(output).toEqual(
      new Error(
        `The path "/root/libs/test" seems to be not a valid project directory`,
      ),
    );
  });

  it('should not throw if remove throw an error', async () => {
    remove.mockReset();
    remove.mockImplementationOnce(() => {
      throw new Error('should be catched');
    });

    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledTimes(5);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(copy).toHaveBeenCalledTimes(2);
    expect(processImportReplacements).toHaveBeenCalledTimes(2);
    expect(output).toEqual({ success: true });
  });

  it('should throw if hpf generate got an error', async () => {
    execSpy.mockReset();
    execSpy.mockImplementationOnce((_cmd, _options, cb) =>
      cb(null, {
        stdout: 'Hapify generation success',
        stderr: 'Error occured',
      }),
    );

    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledTimes(3);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledTimes(0);
    expect(processImportReplacements).toHaveBeenCalledTimes(0);
    expect(output).toEqual(new Error('Error occured'));
  });

  it('should not remove the generated folder if cleanFirst options is set to false', async () => {
    const output = await executor(
      { ...defaultOptions, cleanFirst: false },
      defaultContext,
    );

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledTimes(4);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(copy).toHaveBeenCalledTimes(2);
    expect(processImportReplacements).toHaveBeenCalledTimes(2);
    expect(output).toEqual({ success: true });
  });

  it('should not move the generated folder if inputHapifyGeneratedPath is equals to outputGeneratedPath', async () => {
    const output = await executor(
      { ...defaultOptions, outputGeneratedPath: 'generated' },
      defaultContext,
    );

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledTimes(7);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(copy).toHaveBeenCalledTimes(2);
    expect(processImportReplacements).toHaveBeenCalledTimes(2);
    expect(output).toEqual({ success: true });
  });

  it('should not run prettier write if format options is false', async () => {
    const output = await executor(
      { ...defaultOptions, format: false },
      defaultContext,
    );

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledTimes(7);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledTimes(2);
    expect(processImportReplacements).toHaveBeenCalledTimes(2);
    expect(output).toEqual({ success: true });
  });

  it('should throw if an unexpected error is thrown', async () => {
    pathExists.mockReset();
    pathExists.mockImplementationOnce(async () => {
      // eslint-disable-next-line no-throw-literal
      throw 'unexpected error';
    });
    let output;

    try {
      output = await executor(defaultOptions, defaultContext);
    } catch (err: unknown) {
      output = err;
    }

    expect(pathExists).toHaveBeenCalledTimes(2);
    expect(remove).toHaveBeenCalledTimes(0);
    expect(getHapifyOptions).toHaveBeenCalledTimes(0);
    expect(execSpy).toHaveBeenCalledTimes(0);
    expect(copy).toHaveBeenCalledTimes(0);
    expect(processImportReplacements).toHaveBeenCalledTimes(0);
    expect(output).toEqual('unexpected error');
  });

  it('should throw if the package json not found', async () => {
    packageJsonName.mockReset();
    packageJsonName.mockReturnValueOnce(undefined);

    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(2);
    expect(remove).toHaveBeenCalledTimes(0);
    expect(getHapifyOptions).toHaveBeenCalledTimes(0);
    expect(execSpy).toHaveBeenCalledTimes(0);
    expect(copy).toHaveBeenCalledTimes(0);
    expect(processImportReplacements).toHaveBeenCalledTimes(0);
    expect(output).toEqual(
      new Error('could not found the package.json file in /root/libs/test'),
    );
  });

  it('should throw if no hapify config have been found', async () => {
    getHapifyConfig.mockReset();
    getHapifyConfig.mockReturnValueOnce(undefined);

    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledTimes(0);
    expect(getHapifyOptions).toHaveBeenCalledTimes(0);
    expect(execSpy).toHaveBeenCalledTimes(0);
    expect(copy).toHaveBeenCalledTimes(0);
    expect(processImportReplacements).toHaveBeenCalledTimes(0);
    expect(output).toEqual(
      new Error('No hapify config found in /root/libs/test folder'),
    );
  });

  it('should still work even if no folder exist in the root directory', async () => {
    pathExists.mockReset();
    pathExists.mockReturnValueOnce(Promise.resolve(true));
    pathExists.mockReturnValueOnce(Promise.resolve(false));
    pathExists.mockReturnValueOnce(Promise.resolve(true));

    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledTimes(3);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(copy).toHaveBeenCalledTimes(1);
    expect(processImportReplacements).toHaveBeenCalledTimes(1);
    expect(output).toEqual({ success: true });
  });

  it('should still work even if no importReplacements is inside the hapify config', async () => {
    getHapifyConfig.mockReset();
    getHapifyConfig.mockReturnValue(Promise.resolve({}));

    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledTimes(7);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(copy).toHaveBeenCalledTimes(2);
    expect(processImportReplacements).toHaveBeenCalledTimes(2);
    expect(output).toEqual({ success: true });
  });

  it('should still work even if inputGeneratedFiles does not exists', async () => {
    readdir.mockReset();
    readdir.mockReturnValueOnce(Promise.reject());
    readdir.mockReturnValue(Promise.resolve(['mock', 'src', 'test']));

    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledTimes(4);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(copy).toHaveBeenCalledTimes(2);
    expect(processImportReplacements).toHaveBeenCalledTimes(2);
    expect(output).toEqual({ success: true });
  });
});
