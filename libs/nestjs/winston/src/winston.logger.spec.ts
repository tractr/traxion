import { MESSAGE } from 'triple-beam';
import { createLogger, transports } from 'winston';

import { createWinstonLogger, WinstonLogger } from './winston.logger';

describe('WinstonLogger', () => {
  let output: jest.Mock<void, unknown[]>;
  let logger: WinstonLogger;

  beforeEach(() => {
    output = jest.fn();
    logger = new WinstonLogger(
      createLogger({
        level: 'debug',
        transports: [
          new transports.Console({
            log: (info) => output(info[MESSAGE]),
          }),
        ],
      }),
    );
  });

  afterEach(() => {
    output.mockRestore();
  });

  it('should be able to get an instance of WinstonLogger', () => {
    expect(logger).toBeDefined();
    expect(logger.winston).toBeDefined();
  });

  it('should return a new instance of WinstonLogger', () => {
    expect(createWinstonLogger()).toBeInstanceOf(WinstonLogger);
  });

  it('should be able to use the log method', () => {
    logger.log('test');
    expect(output).toHaveBeenCalledWith(
      `${JSON.stringify({ level: 'info', message: 'test' })}`,
    );
  });

  it('should be able to use the warn method', () => {
    logger.warn('test');
    expect(output).toHaveBeenCalledWith(
      `${JSON.stringify({ level: 'warn', message: 'test' })}`,
    );
  });

  it('should be able to use the error method', () => {
    logger.error('test');
    expect(output).toHaveBeenCalledWith(
      `${JSON.stringify({ level: 'error', message: 'test' })}`,
    );
  });

  it('should be able to use the debug method', () => {
    logger.debug('test');
    expect(output).toHaveBeenCalledWith(
      `${JSON.stringify({ level: 'debug', message: 'test' })}`,
    );
  });

  it('should be able to use the verbose method', () => {
    logger.verbose('test');
    expect(output).toHaveBeenCalledWith(
      `${JSON.stringify({ level: 'verbose', message: 'test' })}`,
    );
  });

  it('should print the context if any', () => {
    logger.verbose('test', 'context');
    expect(output).toHaveBeenCalledWith(
      `${JSON.stringify({
        context: 'context',
        level: 'verbose',
        message: 'test',
      })}`,
    );
  });

  it('should print the metadata if any', () => {
    logger.verbose('test', { foo: 'bar' });
    expect(output).toHaveBeenCalledWith(
      `${JSON.stringify({
        foo: 'bar',
        level: 'verbose',
        message: 'test',
      })}`,
    );
  });

  it('should print the metadata and the context if any', () => {
    logger.verbose('test', { foo: 'bar' }, 'context');
    expect(output).toHaveBeenCalledWith(
      `${JSON.stringify({
        context: 'context',
        foo: 'bar',
        level: 'verbose',
        message: 'test',
      })}`,
    );
  });
});
