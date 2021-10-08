import { ApiComponentPublicConfig } from '@tractr/terraform-api-service';
import { PostgresComponentPublicConfig } from '@tractr/terraform-postgres-service';
import { PwaComponentPublicConfig } from '@tractr/terraform-pwa-service';
import { ReverseProxyComponentPublicConfig } from '@tractr/terraform-reverse-proxy-service';

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
