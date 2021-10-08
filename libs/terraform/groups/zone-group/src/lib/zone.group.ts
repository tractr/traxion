import { CertificatesComponent } from './components';
import { ZoneGroupConfig } from './interfaces';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

/**
 * This group create an SSL certificate and gives access to the Route53 Zone Id
 */
export class ZoneGroup extends AwsComponent<ZoneGroupConfig> {
  protected readonly certificatesComponent: CertificatesComponent;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ZoneGroupConfig,
  ) {
    super(scope, id, config);
    this.certificatesComponent = this.createCertificatesComponent();
  }

  protected createCertificatesComponent() {
    return new CertificatesComponent(this, 'cert', {
      domainName: this.config.domainName,
    });
  }

  getAcmCertificateArnAsToken(): string {
    return this.certificatesComponent.getAcmCertificateArnAsToken();
  }

  getRoute53ZoneIdAsToken(): string {
    return this.certificatesComponent.getRoute53ZoneIdAsToken();
  }

  getDomainName(): string {
    return this.config.domainName;
  }
}
