import { CertificatesComponentArtifacts } from './certificates-component.interface';

export interface ZoneGroupConfig {
  domainName: string;
}
export interface ZoneGroupArtifacts extends CertificatesComponentArtifacts {
  domainName: string;
}
