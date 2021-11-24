import { ApiComponentPublicConfig } from '@tractr/terraform-service-api';
import { PostgresComponentPublicConfig } from '@tractr/terraform-service-postgres';
import { PwaComponentPublicConfig } from '@tractr/terraform-service-pwa';
import { ReverseProxyComponentPublicConfig } from '@tractr/terraform-service-reverse-proxy';

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
