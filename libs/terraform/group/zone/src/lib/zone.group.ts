import { CertificatesComponent } from './components';
import { ZoneGroupArtifacts, ZoneGroupConfig } from './interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

/**
 * This group create an SSL certificate and gives access to the Route53 Zone Id
 */
export class ZoneGroup extends AwsComponent<
  ZoneGroupConfig,
  ZoneGroupArtifacts
> {
  protected createComponents() {
    const certificates = new CertificatesComponent(this, 'cert', {
      domainName: this.config.domainName,
    });
    this.artifacts = {
      ...certificates.artifacts,
      domainName: this.config.domainName,
    };
  }
}
