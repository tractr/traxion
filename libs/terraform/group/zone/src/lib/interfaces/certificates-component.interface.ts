import { acm, route53 } from '@cdktf/provider-aws';

export interface CertificatesComponentConfig {
  domainName: string;
}

export interface CertificatesComponentArtifacts {
  acmCertificate: acm.AcmCertificate;
  route53Zone: route53.DataAwsRoute53Zone;
}
