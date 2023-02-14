import { Environment } from '../interfaces';

/**
 * @example
 * {
 *  desiredCount: 2,
 *  cpu: '1024',
 *  memory: '512',
 *  containerConfig: {
 *    imageName: 'postgis/postgis',
 *    imageTag: '15-3.3-alpine',
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
  admin: {},
  postgres: {
    containerConfig: {
      imageName: 'postgis/postgis',
      imageTag: '15-3.3-alpine',
    },
  },
  reverseProxy: {},
};
