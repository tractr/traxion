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
   * PWA docker container tag to deploy
   */
  pwaImageTag: string;
  /**
   * API docker container tag to deploy
   */
  apiImageTag: string;
}
