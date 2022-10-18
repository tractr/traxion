import { acm, route53 } from '@cdktf/provider-aws';

import {
  CertificatesComponentArtifacts,
  CertificatesComponentConfig,
} from '../interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

/**
 * This component create an SSL certificate and validate it using Route53
 */
export class CertificatesComponent extends AwsComponent<
  CertificatesComponentConfig,
  CertificatesComponentArtifacts
> {
  protected createComponents(): void {
    // Fetch existing zone
    const zone = this.getRoute53Zone();
    // Create certificate with domain provided in the config
    const certificate = this.createAcmCertificate();
    // Create validation record in the previously fetched zone
    const validationRecord = this.createValidationRecord(certificate, zone);
    // Validate certificate
    this.validateCertificate(certificate, validationRecord);
    // Populate artifacts
    this.artifacts = {
      acmCertificate: certificate,
      route53Zone: zone,
    };
  }

  private getRoute53Zone() {
    return new route53.DataAwsRoute53Zone(this, 'r53', {
      name: this.config.domainName,
      privateZone: false,
    });
  }

  private createAcmCertificate() {
    return new acm.AcmCertificate(this, 'acm', {
      domainName: this.config.domainName,
      subjectAlternativeNames:
        this.config.subjectAlternativeNames &&
        this.config.subjectAlternativeNames.length > 0
          ? this.config.subjectAlternativeNames
          : [`*.${this.config.domainName}`],
      validationMethod: 'DNS',
      lifecycle: { createBeforeDestroy: true },
      tags: this.getResourceNameAsTag('acm'),
    });
  }

  private createValidationRecord(
    certificate: acm.AcmCertificate,
    zone: route53.DataAwsRoute53Zone,
  ) {
    // Get validation options
    const validationOptions = certificate.domainValidationOptions.get(0);
    return new route53.Route53Record(this, 'record', {
      allowOverwrite: true,
      name: validationOptions.resourceRecordName,
      records: [validationOptions.resourceRecordValue],
      ttl: 60,
      type: validationOptions.resourceRecordType,
      zoneId: zone.zoneId,
    });
  }

  private validateCertificate(
    certificate: acm.AcmCertificate,
    validationRecord: route53.Route53Record,
  ) {
    return new acm.AcmCertificateValidation(this, 'valid', {
      certificateArn: certificate.arn,
      validationRecordFqdns: [validationRecord.fqdn],
    });
  }
}
