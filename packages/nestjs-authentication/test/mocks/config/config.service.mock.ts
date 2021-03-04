import { ConfigService } from '@nestjs/config';

export function mockConfigServiceFactory(configuration: {
  [key: string]: unknown;
}): ConfigService {
  return ({
    get: jest.fn((key: string) => {
      if (key in configuration) return configuration[key];

      throw new Error(`Mock ConfigService: ${key} not found`);
    }),
  } as unknown) as ConfigService;
}
