import { ApiComponentPublicConfig } from '@tractr/terraform-service-api';
import { PostgresComponentPublicConfig } from '@tractr/terraform-service-postgres';
import { PwaComponentPublicConfig } from '@tractr/terraform-service-pwa';
import { ReverseProxyComponentPublicConfig } from '@tractr/terraform-service-reverse-proxy';

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
export const ApiConfig: ApiComponentPublicConfig = {};

export const PwaConfig: PwaComponentPublicConfig = {};

export const PostgresConfig: PostgresComponentPublicConfig = {};

export const ReverseProxyConfig: ReverseProxyComponentPublicConfig = {};
