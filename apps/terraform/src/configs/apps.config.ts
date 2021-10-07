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
 *      JWT_SECRET: { type: 'secret' },
 *      COOKIE_SECRET: { type: 'secret', secretKey: 'CUSTOM_KEY' },
 *      POSTGRES_OPTIONS: { type: 'env', value: 'readonly=true' },
 *      POSTGRES_HOST: {
 *        type: 'env',
 *        value: (service, config) => service.getServiceDomainName('postgres'),
 *      },
 *      OTHER_ENV: { type: 'env', value: 'something' },
 *    },
 *  },
 * }
 */
export const ApiConfig: ApiComponentPublicConfig = {};

export const PwaConfig: PwaComponentPublicConfig = {};

export const PostgresConfig: PostgresComponentPublicConfig = {};

export const ReverseProxyConfig: ReverseProxyComponentPublicConfig = {};
