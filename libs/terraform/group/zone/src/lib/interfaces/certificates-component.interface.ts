export interface CertificatesComponentConfig {
  domainName: string;
}

export interface CertificatesComponentArtifacts {
  acmCertificateArn: string;
  route53ZoneId: string;
}
