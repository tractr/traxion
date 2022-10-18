import { CertificatesComponentArtifacts } from './certificates-component.interface';

export interface ZoneGroupConfig {
  domainName: string;
  subjectAlternativeNames?: string[];
}
export interface ZoneGroupArtifacts extends CertificatesComponentArtifacts {
  domainName: string;
}
