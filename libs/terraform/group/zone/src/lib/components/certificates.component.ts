import {
  AcmCertificate,
  AcmCertificateValidation,
  DataAwsRoute53Zone,
  Route53Record,
} from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface CertificatesComponentConfig extends ConstructOptions {
  domainName: string;
}

/**
 * This component create an SSL certificate and validate it using Route53
 */
export class CertificatesComponent extends AwsComponent<CertificatesComponentConfig> {
  protected readonly acmCertificate: AcmCertificate;

  protected readonly acmCertificateValidation: AcmCertificateValidation;

  protected readonly route53Record: Route53Record;

  protected route53Zone: DataAwsRoute53Zone;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: CertificatesComponentConfig,
  ) {
    super(scope, id, config);

    this.route53Zone = this.getRoute53Zone();
    this.acmCertificate = this.createAcmCertificate();
    this.route53Record = this.createRoute53Record();
    this.acmCertificateValidation = this.createAcmCertificateValidation();
  }

  protected getRoute53Zone() {
    return new DataAwsRoute53Zone(this, 'r53', {
      provider: this.provider,
      name: this.config.domainName,
      privateZone: false,
    });
  }

  protected createAcmCertificate() {
    return new AcmCertificate(this, 'acm', {
      provider: this.provider,
      domainName: this.config.domainName,
      subjectAlternativeNames: [`*.${this.config.domainName}`],
      validationMethod: 'DNS',
      lifecycle: { createBeforeDestroy: true },
      tags: this.getResourceNameAsTag('acm'),
    });
  }

  protected createRoute53Record() {
    const domainValidationOptions =
      this.acmCertificate.domainValidationOptions('0');
    return new Route53Record(this, 'record', {
      provider: this.provider,
      allowOverwrite: true,
      name: this.wrapInToList(domainValidationOptions.resourceRecordName),
      records: [this.wrapInToList(domainValidationOptions.resourceRecordValue)],
      ttl: 60,
      type: this.wrapInToList(domainValidationOptions.resourceRecordType),
      zoneId: this.getRoute53ZoneIdAsToken(),
    });
  }

  protected createAcmCertificateValidation() {
    return new AcmCertificateValidation(this, 'valid', {
      provider: this.provider,
      certificateArn: this.getAcmCertificateArnAsToken(),
      validationRecordFqdns: [this.route53Record.fqdn],
    });
  }

  getAcmCertificateArnAsToken(): string {
    return Token.asString(this.acmCertificate.arn);
  }

  getRoute53ZoneIdAsToken(): string {
    return Token.asString(this.route53Zone.zoneId);
  }

  /**
   * Dirty solution for https://github.com/hashicorp/terraform-cdk/issues/424
   */
  protected wrapInToList(input: string): string {
    return input.replace('${', '${tolist(').replace('.0.', ').0.');
  }
}
