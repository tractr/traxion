import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { LoggerService } from './logger.service';

describe('loggerService', () => {
  let loggerService: LoggerService;
  let verbose: jest.SpyInstance;
  let debug: jest.SpyInstance;
  let log: jest.SpyInstance;
  let warn: jest.SpyInstance;
  let error: jest.SpyInstance;

  beforeEach(async () => {
    verbose = jest.spyOn(Logger.prototype, 'verbose');
    debug = jest.spyOn(Logger.prototype, 'debug');
    log = jest.spyOn(Logger.prototype, 'log');
    warn = jest.spyOn(Logger.prototype, 'warn');
    error = jest.spyOn(Logger.prototype, 'error');

    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    loggerService = await module.resolve<LoggerService>(LoggerService);
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  afterEach(() => {});

  it('should be defined', () => {
    expect(loggerService).toBeDefined();
  });

  it('should log a simple string', () => {
    loggerService.log('test');
    expect(log).toHaveBeenLastCalledWith('test', { metadata: undefined });
  });

  it('should error a simple string', () => {
    loggerService.error('test');
    expect(error).toHaveBeenLastCalledWith('test', {
      metadata: { stackTrace: undefined },
    });
  });

  it('should warn a simple string', () => {
    loggerService.warn('test');
    expect(warn).toHaveBeenLastCalledWith('test', { metadata: undefined });
  });

  it('should verbose a simple string', () => {
    loggerService.verbose('test');
    expect(verbose).toHaveBeenLastCalledWith('test', { metadata: undefined });
  });

  it('should debug a simple string', () => {
    loggerService.debug('test');
    expect(debug).toHaveBeenLastCalledWith('test', { metadata: undefined });
  });

  it('should use a default context', () => {
    loggerService.setContext('context');
    loggerService.log('test');
    expect(log).toHaveBeenLastCalledWith(
      'test',
      { metadata: undefined },
      'context',
    );
  });

  it('should use a default metadata', () => {
    loggerService.setMetadata({ foo: 'bar' });
    loggerService.log('test');
    expect(log).toHaveBeenLastCalledWith('test', { metadata: { foo: 'bar' } });
  });

  it('should use a default metadata and default context', () => {
    loggerService.setContext('context');
    loggerService.setMetadata({ foo: 'bar' });
    loggerService.log('test');
    expect(log).toHaveBeenLastCalledWith(
      'test',
      { metadata: { foo: 'bar' } },
      'context',
    );
  });

  it('should accept an error object', () => {
    loggerService.error(new Error());
    expect(error).toHaveBeenLastCalledWith('', {
      metadata: {
        stackTrace: expect.any(String),
      },
    });
  });

  it('should accept an error object and a context', () => {
    loggerService.error(new Error('error message'), 'context');
    expect(error).toHaveBeenLastCalledWith(
      'error message',
      { metadata: { stackTrace: expect.any(String) } },
      'context',
    );
  });

  it('should accept an error object a metadata and a context', () => {
    loggerService.error(new Error('error message'), { foo: 'bar' }, 'context');
    expect(error).toHaveBeenLastCalledWith(
      'error message',
      { metadata: { stackTrace: expect.any(String), foo: 'bar' } },
      'context',
    );
  });

  it('should accept an error and a stack as a string', () => {
    const errorInstance = new Error('error message');
    loggerService.error(errorInstance.message, errorInstance.stack, 'context');
    expect(error).toHaveBeenLastCalledWith(
      'error message',
      { metadata: { stackTrace: expect.any(String) } },
      'context',
    );
  });

  it('should accept an object as message', () => {
    loggerService.log({
      message: 'test',
      foo: 'bar',
    });
    expect(log).toHaveBeenLastCalledWith('test', { metadata: { foo: 'bar' } });
  });
});
