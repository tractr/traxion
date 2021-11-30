import { Secret } from '@tractr/terraform-service-ecs';

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
  api: {
    containerConfig: {
      environments: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '',
        API_URL: (service) => service.getApplicationUrl('/api'),
        PWA_URL: (service) => service.getApplicationUrl(''),
        POSTGRES_DB: 'api',
        POSTGRES_DB_TEST: 'testing',
        POSTGRES_HOST: (service) => service.getServiceDomainName('postgres'),
        POSTGRES_PORT: '5432',
        POSTGRES_SCHEMA: 'public',
        POSTGRES_OPTIONS: '',
        COOKIE_SECRET: Secret(),
        JWT_SECRET: Secret(),
        POSTGRES_PASSWORD: Secret(),
        POSTGRES_USER: Secret(),
        SENTRY_DEBUG: Secret(),
        SENTRY_DSN: Secret(),
        SENTRY_ENV: Secret(),
        SENTRY_LOG_LEVEL: Secret(),
        MESSAGE_BROKER_URL: Secret(),
        MESSAGE_BROKER_USER: Secret(),
        MESSAGE_BROKER_PASSWORD: Secret(),
      },
    },
  },
  pwa: {
    containerConfig: {
      environments: {
        API_URL: (service) => service.getApplicationUrl('/api'),
        GRAPHQL_URL: (service) => service.getApplicationUrl('/graphql'),
      },
    },
  },
  postgres: {
    containerConfig: {
      environments: {
        POSTGRES_DB: 'api', // Same as default
        POSTGRES_USER: Secret(), // Same as default
        POSTGRES_PASSWORD: Secret(), // Same as default
      },
    },
  },
  messageBrokerHandler: {
    containerConfig: {
      environments: {},
    },
  },
  reverseProxy: {
    containerConfig: {
      auth: {
        passwordHash: 'can be set when traefik/traefik#5853 is closed',
      },
    },
  },
};
