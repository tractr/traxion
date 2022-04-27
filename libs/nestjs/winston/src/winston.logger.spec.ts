import { createLogger } from 'winston';
import winston = require('winston/lib/winston/config');

import { WinstonLogger } from './winston.logger';

describe('WinstonLogger', () => {
  let output: jest.SpyInstance;

  beforeEach(() => {
    output = jest.spyOn(process.stdout, 'write');
  });

  it('should instantiate', () => {
    const logger = new WinstonLogger(createLogger());
    expect(logger).toBeDefined();
    expect(logger.winston).toBeDefined();
  });

  it('should log', () => {
    const logger = new WinstonLogger(createLogger());
    logger.log('test');

    expect(output).toHaveBeenCalledWith('test\n');
  });
});
