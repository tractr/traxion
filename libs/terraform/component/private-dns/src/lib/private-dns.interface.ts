import { servicediscovery } from '@cdktf/provider-aws';

export interface PrivateDnsComponentConfig {
  vpcId: string;
}
export interface PrivateDnsComponentArtifacts {
  dnsNamespace: servicediscovery.ServiceDiscoveryPrivateDnsNamespace;
}
