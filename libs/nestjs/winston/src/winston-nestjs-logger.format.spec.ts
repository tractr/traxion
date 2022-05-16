import { MESSAGE } from 'triple-beam';
import { createLogger, format, transports } from 'winston';

import { nestLikeConsoleFormat } from './winston-nestjs-logger.format';
import { createWinstonLogger, WinstonLogger } from './winston.logger';

describe('WinstonLogger', () => {
  let output: jest.Mock<void, unknown[]>;
  let logger: WinstonLogger;

  beforeEach(() => {
    output = jest.fn();

    logger = createWinstonLogger({
      level: 'debug',
      format: nestLikeConsoleFormat({
        colors: false,
      }),
      transports: [
        new transports.Console({
          log: (info) => output(info[MESSAGE]),
        }),
      ],
    });
  });

  afterEach(() => {
    output.mockRestore();
  });

  it('should be able to get an instance of WinstonLogger', () => {
    expect(logger).toBeDefined();
    expect(logger.winston).toBeDefined();
  });

  it('should be able to use the log method', () => {
    logger.log('test');
    expect(output).toHaveBeenCalledWith('[Nest] Info\ttest - {}');
  });

  it('should be able to use the warn method', () => {
    logger.warn('test');
    expect(output).toHaveBeenCalledWith('[Nest] Warn\ttest - {}');
  });

  it('should be able to use the error method', () => {
    logger.error('test');
    expect(output).toHaveBeenCalledWith('[Nest] Error\ttest - {}');
  });

  it('should be able to use the debug method', () => {
    logger.debug('test');
    expect(output).toHaveBeenCalledWith('[Nest] Debug\ttest - {}');
  });

  it('should be able to use the verbose method', () => {
    logger.verbose('test');
    expect(output).toHaveBeenCalledWith('[Nest] Verbose\ttest - {}');
  });

  it('should print the context if any', () => {
    logger.verbose('test', 'context');
    expect(output).toHaveBeenCalledWith('[Nest] Verbose\t[context] test - {}');
  });

  it('should print the metadata if any', () => {
    logger.verbose('test', { foo: 'bar' });
    expect(output).toHaveBeenCalledWith(
      "[Nest] Verbose\ttest - { foo: 'bar' }",
    );
  });

  it('should print the metadata and the context if any', () => {
    logger.verbose('test', { foo: 'bar' }, 'context');
    expect(output).toHaveBeenCalledWith(
      "[Nest] Verbose\t[context] test - { foo: 'bar' }",
    );
  });

  it('should print the timestamp if metadata is used', () => {
    const date = new Date();

    const loggerWithTimestamp = createWinstonLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD' }),
        nestLikeConsoleFormat({
          colors: false,
        }),
      ),
      transports: [
        new transports.Console({
          log: (info) => output(info[MESSAGE]),
        }),
      ],
    });

    loggerWithTimestamp.warn('test', { foo: 'bar' }, 'context');
    expect(output).toHaveBeenCalledWith(
      `[Nest] Warn\t${
        date.toISOString().split('T')[0]
      } [context] test - { foo: 'bar' }`,
    );
  });

  it('should print the app name', () => {
    const loggerWithTimestamp = createWinstonLogger({
      format: nestLikeConsoleFormat({
        appName: 'Stack',
        colors: false,
      }),
      transports: [
        new transports.Console({
          log: (info) => output(info[MESSAGE]),
        }),
      ],
    });

    loggerWithTimestamp.warn('test', { foo: 'bar' }, 'context');
    expect(output).toHaveBeenCalledWith(
      `[Stack] Warn\t[context] test - { foo: 'bar' }`,
    );
  });

  it('should print the colors name', () => {
    const loggerWithTimestamp = createWinstonLogger({
      format: nestLikeConsoleFormat({
        colors: 1,
      }),
      transports: [
        new transports.Console({
          log: (info) => output(info[MESSAGE]),
        }),
      ],
    });

    loggerWithTimestamp.warn('test', { foo: 'bar' }, 'context');
    expect(output).toHaveBeenCalledWith(
      `[33m[Nest][39m Warn\t[33m[context][39m [33mtest[39m - { foo: [32m'bar'[39m }`,
    );
  });

  it('should use the default', () => {
    const loggerWithTimestamp = createWinstonLogger({
      format: nestLikeConsoleFormat({
        colors: 1,
      }),
      transports: [
        new transports.Console({
          log: (info) => output(info[MESSAGE]),
        }),
      ],
    });

    loggerWithTimestamp.warn('test', { foo: 'bar' }, 'context');
    expect(output).toHaveBeenCalledWith(
      `[33m[Nest][39m Warn\t[33m[context][39m [33mtest[39m - { foo: [32m'bar'[39m }`,
    );
  });

  it('should use the default', () => {
    const loggerWithTimestamp = createWinstonLogger({
      format: nestLikeConsoleFormat({
        prettyPrint: false,
        colors: false,
      }),
      transports: [
        new transports.Console({
          log: (info) => output(info[MESSAGE]),
        }),
      ],
    });

    loggerWithTimestamp.warn('test', { foo: 'bar' }, 'context');
    expect(output).toHaveBeenCalledWith(
      `[Nest] Warn\t[context] test - {"foo":"bar"}`,
    );
  });

  it('should not use color if the level is not known', () => {
    const loggerWithTimestamp = createLogger({
      format: nestLikeConsoleFormat(),
      level: 'silly',
      transports: [
        new transports.Console({
          log: (info) => output(info[MESSAGE]),
        }),
      ],
    });

    loggerWithTimestamp.silly('test');
    expect(output).toHaveBeenCalledWith(`[Nest] Silly\ttest - {}`);
  });
});
