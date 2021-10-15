import { Environment } from '../interfaces';

/**
 * @example
 * {
 *  desiredCount: 2,
 *  cpu: '1024',
 *  memory: '512',
 *  containerConfig: {
 *    environments: {
 *      JWT_SECRET: Secret(),
 *      COOKIE_SECRET: Secret('CUSTOM_KEY'),
 *      POSTGRES_OPTIONS: 'readonly=true',
 *      POSTGRES_HOST: (service, config) => service.getServiceDomainName('postgres'),
 *      OTHER_ENV: 'something',
 *    },
 *  },
 * }
 */

export const AppConfig: Required<Environment['config']> = {
  api: {},
  pwa: {},
  postgres: {},
  reverseProxy: {},
};
