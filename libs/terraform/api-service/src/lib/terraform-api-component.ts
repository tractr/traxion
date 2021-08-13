import { Container } from '../../pool/containers/container';
import { BackendServiceComponent } from '../../pool/services/backend-service.component';
import { ApiContainer } from './api.container';
import { apiContainerConfig } from './config';

export class ApiComponent extends BackendServiceComponent {
  protected getIngressPorts(): number[] {
    return [3000];
  }

  protected getContainers(): Container[] {
    return [
      new ApiContainer(this, {
        name: this.serviceName,
        path: {
          prefix: `/${this.serviceName}`,
          stripPrefix: false,
        },
        ...apiContainerConfig,
      }),
    ];
  }
}
