import { InternetGateway } from '@cdktf/provider-aws';

import { BaseComponent, PrivateComponent, PublicComponent } from './components';
import { NETWORK_GROUP_DEFAULT_CONFIG } from './configs';
import {
  AvailabilityZoneInfo,
  NetworkGroupConfig,
  NetworkGroupDefaultConfig,
} from './interfaces';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';

export class NetworkGroup extends AwsComponent<
  NetworkGroupConfig & NetworkGroupDefaultConfig
> {
  protected readonly baseComponent: BaseComponent;

  protected readonly publicComponents: PublicComponent[];

  protected readonly privateComponents: PrivateComponent[];

  protected readonly availabilityZonesInfo: AvailabilityZoneInfo[] = [];

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: NetworkGroupConfig,
  ) {
    super(scope, id, { ...NETWORK_GROUP_DEFAULT_CONFIG, ...config });
    this.baseComponent = this.createBaseComponent();
    // Create one public and one private subnet in each zone
    this.publicComponents = this.createPublicComponents();
    this.privateComponents = this.createPrivateComponents();
  }

  protected createBaseComponent() {
    return new BaseComponent(this, 'base', {
      cidrPrefix: this.config.cidrPrefix || '172.16',
      zones: this.config.zones,
    });
  }

  protected createPublicComponent(index: number) {
    const zoneLetter = this.config.zones[index];
    const publicId = `pub-${zoneLetter}`;
    return new PublicComponent(this, publicId, {
      availabilityZone: this.baseComponent.getZoneName(zoneLetter),
      vpcId: this.getVpcIdAsToken(),
      cidrBlock: this.baseComponent.getPublicCidrBlockForIndex(index),
      ipv6CidrBlock: this.baseComponent.getPublicIpv6CidrBlockForIndex(index),
    });
  }

  protected createPublicComponents() {
    return this.config.zones.map((zone, index) =>
      this.createPublicComponent(index),
    );
  }

  protected createPrivateComponent(
    index: number,
    publicComponent: PublicComponent,
  ) {
    const zoneLetter = this.config.zones[index];
    const privateId = `prv-${zoneLetter}`;
    return new PrivateComponent(this, privateId, {
      publicSubnetId: publicComponent.getSubnetIdAsToken(),
      egressOnlyInternetGatewayId:
        this.baseComponent.getEgressOnlyInternetGatewayGatewayIdAsToken(),
      internetGatewayId: this.baseComponent.getInternetGatewayIdAsToken(),
      internetAccessMode: this.config.internetAccessMode,
      availabilityZone: this.baseComponent.getZoneName(zoneLetter),
      vpcId: this.getVpcIdAsToken(),
      cidrBlock: this.baseComponent.getPrivateCidrBlockForIndex(index),
      ipv6CidrBlock: this.baseComponent.getPrivateIpv6CidrBlockForIndex(index),
    });
  }

  protected createPrivateComponents() {
    return this.publicComponents.map((publicComponent, index) =>
      this.createPrivateComponent(index, publicComponent),
    );
  }

  getPublicSubnetsIdsAsTokens(): string[] {
    return this.publicComponents.map((component) =>
      component.getSubnetIdAsToken(),
    );
  }

  getPrivateSubnetsIdsAsTokens(): string[] {
    return this.privateComponents.map((component) =>
      component.getSubnetIdAsToken(),
    );
  }

  getVpcIdAsToken(): string {
    return this.baseComponent.getVpcIdAsToken();
  }

  getInternetGateway(): InternetGateway {
    return this.baseComponent.getInternetGateway();
  }

  getAvailabilityZonesInfo(): AvailabilityZoneInfo[] {
    return this.config.zones.map((letter) => ({
      fullName: this.baseComponent.getZoneName(letter),
      shortName: letter,
    }));
  }
}
