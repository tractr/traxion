import { exec } from 'child_process';

import {
  ExecutorContext,
  logger,
  WorkspaceJsonConfiguration,
} from '@nrwl/devkit';
import * as fs from 'fs-extra';

import executor from './executor';
import { GenerateExecutorSchema } from './schema';

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

describe('Generate executor:generate', () => {
  let defaultContext: ExecutorContext;
  let defaultOptions: GenerateExecutorSchema;
  let execSpy: jest.SpyInstance;

  // nrwl devkit
  let loggerSpy: jest.SpyInstance;

  // fs
  let pathExists: jest.SpyInstance;
  let remove: jest.SpyInstance;
  let move: jest.SpyInstance;

  // tractr
  let getHapifyOptions: jest.SpyInstance;
  let hapifyUpdateTemplatesImportPath: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();

    // Default options and context
    defaultContext = {
      root: '/root',
      cwd: '/cwd',
      isVerbose: false,
      workspace: {} as WorkspaceJsonConfiguration,
    };
    defaultOptions = {
      cwd: 'libs/test',
      format: true,
      outputGeneratedPath: 'src/generated',
      inputHapifyGeneratedPath: 'generated',
      cleanFirst: true,
    };
    // node child_process
    execSpy = exec as jest.MockedFunction<typeof exec>;

    // fs
    pathExists = jest.spyOn(fs, 'pathExists');
    remove = jest.spyOn(fs, 'remove');
    move = jest.spyOn(fs, 'move');

    // nrwl devkit
    loggerSpy = jest.spyOn(logger, 'debug');
    jest.spyOn(console, 'debug').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();

    // tractr
    getHapifyOptions = jest.spyOn(hapifyGenerateConfig, 'getHapifyOptions');
    hapifyUpdateTemplatesImportPath = jest.spyOn(
      hapifyUpdateTemplates,
      'hapifyUpdateTemplatesImportPath',
    );

    // Mock the default return values
    pathExists.mockReturnValueOnce(Promise.resolve(true));
    remove.mockReturnValueOnce(Promise.resolve(true));
    getHapifyOptions.mockReturnValueOnce(Promise.resolve(true));
    execSpy.mockImplementationOnce((_cmd, _options, cb) =>
      cb(null, { stdout: '', stderr: '' }),
    );
    move.mockReturnValueOnce(Promise.resolve(true));
    hapifyUpdateTemplatesImportPath.mockReturnValueOnce(Promise.resolve(true));
    execSpy.mockImplementationOnce((_cmd, cb) =>
      cb(null, { stdout: '', stderr: '' }),
    );
  });

  it('should execute all the action when the default options are used', async () => {
    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(1);
    expect(pathExists).toHaveBeenCalledWith('/root/libs/test');

    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith('/root/libs/test/src/generated');

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

    expect(move).toHaveBeenCalledTimes(1);
    expect(move).toHaveBeenCalledWith(
      '/root/libs/test/generated',
      '/root/libs/test/src/generated',
    );

    expect(hapifyUpdateTemplatesImportPath).toHaveBeenCalledTimes(1);
    expect(hapifyUpdateTemplatesImportPath).toHaveBeenCalledWith(
      '/root/libs/test/src/generated',
      '/root/libs/test',
    );

    expect(execSpy).toHaveBeenNthCalledWith(
      2,
      `npx prettier '/root/libs/test/src/generated/**/*.ts' --write`,
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
    expect(loggerSpy).toHaveBeenCalledWith('Check if /root/libs/test exists');
    expect(loggerSpy).toHaveBeenCalledWith(
      'Remove /root/libs/test/src/generated',
    );
    expect(loggerSpy).toHaveBeenCalledWith('Generate the configuration files');
    expect(loggerSpy).toHaveBeenCalledWith('Generate the hapify files');
    expect(loggerSpy).toHaveBeenCalledWith('Hapify generation success');
    expect(loggerSpy).toHaveBeenCalledWith(
      'Move the generated files to src/generated',
    );
    expect(loggerSpy).toHaveBeenCalledWith('Update the templates import path');
    expect(loggerSpy).toHaveBeenCalledWith('Format the generated files');

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

    expect(pathExists).toHaveBeenCalledTimes(1);
    expect(pathExists).toHaveBeenCalledWith('/root/libs/test');

    expect(remove).toHaveBeenCalledTimes(0);
    expect(getHapifyOptions).toHaveBeenCalledTimes(0);
    expect(execSpy).toHaveBeenCalledTimes(0);
    expect(move).toHaveBeenCalledTimes(0);
    expect(hapifyUpdateTemplatesImportPath).toHaveBeenCalledTimes(0);
    expect(output).toEqual({ success: false });
  });

  it('should not throw if remove throw an error', async () => {
    remove.mockReset();
    remove.mockImplementationOnce(() => {
      throw new Error('should be catched');
    });

    const output = await executor(defaultOptions, defaultContext);

    expect(pathExists).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(move).toHaveBeenCalledTimes(1);
    expect(hapifyUpdateTemplatesImportPath).toHaveBeenCalledTimes(1);
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

    expect(pathExists).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(1);
    expect(move).toHaveBeenCalledTimes(0);
    expect(hapifyUpdateTemplatesImportPath).toHaveBeenCalledTimes(0);
    expect(output).toEqual({ success: false });
  });

  it('should not remove the generated folder if cleanFirst options is set to false', async () => {
    const output = await executor(
      { ...defaultOptions, cleanFirst: false },
      defaultContext,
    );

    expect(pathExists).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(0);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(move).toHaveBeenCalledTimes(1);
    expect(hapifyUpdateTemplatesImportPath).toHaveBeenCalledTimes(1);
    expect(output).toEqual({ success: true });
  });

  it('should not move the generated folder if inputHapifyGeneratedPath is equals to outputGeneratedPath', async () => {
    const output = await executor(
      { ...defaultOptions, outputGeneratedPath: 'generated' },
      defaultContext,
    );

    expect(pathExists).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(2);
    expect(move).toHaveBeenCalledTimes(0);
    expect(hapifyUpdateTemplatesImportPath).toHaveBeenCalledTimes(1);
    expect(output).toEqual({ success: true });
  });

  it('should not run prettier write if format options is false', async () => {
    const output = await executor(
      { ...defaultOptions, format: false },
      defaultContext,
    );

    expect(pathExists).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(getHapifyOptions).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledTimes(1);
    expect(move).toHaveBeenCalledTimes(1);
    expect(hapifyUpdateTemplatesImportPath).toHaveBeenCalledTimes(1);
    expect(output).toEqual({ success: true });
  });
});
