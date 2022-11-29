import { AdminComponentPublicConfig } from '@trxn/terraform-service-admin';
import { ApiComponentPublicConfig } from '@trxn/terraform-service-api';
import { PostgresComponentPublicConfig } from '@trxn/terraform-service-postgres';
import { PwaComponentPublicConfig } from '@trxn/terraform-service-pwa';
import { ReverseProxyComponentPublicConfig } from '@trxn/terraform-service-reverse-proxy';

export interface Environment {
  /**
   * Friendly name of the environment
   */
  name: string;
  /**
   * Name used to prefix all resources in AWS
   */
  resourceId: string;
  /**
   * Subdomain that will host this environment
   */
  subDomain: string;

  /**
   * Configs that override the main configs
   */
  config: {
    /**
     * PWA config override
     */
    pwa?: PwaComponentPublicConfig;
    /**
     * Admin config override
     */
    admin?: AdminComponentPublicConfig;
    /**
     * API config override
     */
    api?: ApiComponentPublicConfig;
    /**
     * Postgres config override
     */
    postgres?: PostgresComponentPublicConfig;
    /**
     * Reverse proxy config override
     */
    reverseProxy?: ReverseProxyComponentPublicConfig;
  };
}
