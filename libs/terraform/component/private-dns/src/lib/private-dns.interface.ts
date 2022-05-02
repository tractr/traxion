import { servicediscovery, vpc } from '@cdktf/provider-aws';

export interface PrivateDnsComponentConfig {
  vpc: vpc.Vpc;
}
export interface PrivateDnsComponentArtifacts {
  dnsNamespace: servicediscovery.ServiceDiscoveryPrivateDnsNamespace;
}
