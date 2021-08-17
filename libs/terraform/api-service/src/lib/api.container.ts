import { ApiContainerConfig } from './configs';

import { HttpContainer } from '@tractr/terraform-pool-group';

export class ApiContainer extends HttpContainer<ApiContainerConfig> {
  usePrivateImage(): boolean {
    return true;
  }

  protected getAppName(): string {
    return 'api';
  }

  getImageTag(): string {
    return 'latest';
  }

  protected getPort(): number {
    return 3000;
  }
}
