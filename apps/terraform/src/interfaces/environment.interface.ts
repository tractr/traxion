import { ApiComponentPublicConfig } from '@tractr/terraform-service-api';
import { PwaComponentPublicConfig } from '@tractr/terraform-service-pwa';

export interface Environment {
  /**
   * Firendly name of the environment
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
   * PWA config override
   */
  pwaConfig: PwaComponentPublicConfig;
  /**
   * API config override
   */
  apiConfig: ApiComponentPublicConfig;
}
