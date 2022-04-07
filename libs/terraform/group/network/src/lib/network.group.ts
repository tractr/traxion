import { BaseComponent, PrivateComponent, PublicComponent } from './components';
import { NETWORK_GROUP_DEFAULT_CONFIG } from './configs';
import {
  getCidrBlockForIndex,
  getPrivateSubnetNumber,
  getPublicSubnetNumber,
  getZoneName,
} from './helpers';
import {
  NetworkGroupArtifacts,
  NetworkGroupConfig,
  NetworkGroupDefaultConfig,
} from './interfaces';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export class NetworkGroup extends AwsComponent<
  NetworkGroupConfig & NetworkGroupDefaultConfig,
  NetworkGroupArtifacts
> {
  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: NetworkGroupConfig,
  ) {
    super(scope, id, { ...NETWORK_GROUP_DEFAULT_CONFIG, ...config });
  }

  protected createComponents(): void {
    // Create network base (VPC, Internet Gateway, Route Table, etc)
    const baseComponent = this.createBaseComponent();
    // Create one public and one private subnet in each zone
    const publicComponents = this.createPublicComponents(baseComponent);
    const privateComponents = this.createPrivateComponents(
      baseComponent,
      publicComponents,
    );
    // Populate artifacts
    this.artifacts = {
      ...baseComponent.artifacts,
      publicSubnetsIds: publicComponents.map((c) => c.artifacts.subnetId),
      privateSubnetsIds: privateComponents.map((c) => c.artifacts.subnetId),
      availabilityZonesInfo: this.config.zones.map((letter) => ({
        fullName: getZoneName(this.provider, letter),
        shortName: letter,
      })),
    };
  }

  /**
   * Create the base component (VPC, Internet Gateway, Route Table, etc)
   */
  protected createBaseComponent() {
    return new BaseComponent(this, 'base', {
      cidrPrefix: this.config.cidrPrefix || '172.16',
      zones: this.config.zones,
    });
  }

  /**
   * Create public subnets
   */
  protected createPublicComponents(baseComponent: BaseComponent) {
    return this.config.zones.map((zone, index) => {
      const zoneLetter = this.config.zones[index];
      const publicId = `pub-${zoneLetter}`;
      const subnetNumber = getPublicSubnetNumber(index);

      return new PublicComponent(this, publicId, {
        availabilityZone: getZoneName(this.provider, zoneLetter),
        vpcId: baseComponent.artifacts.vpcId,
        cidrBlock: getCidrBlockForIndex(
          baseComponent.artifacts.cidrBlock,
          subnetNumber,
        ),
        ipv6CidrBlock: getCidrBlockForIndex(
          baseComponent.artifacts.ipv6CidrBlock,
          subnetNumber,
        ),
      });
    });
  }

  /**
   * Create private subnets
   */
  protected createPrivateComponents(
    baseComponent: BaseComponent,
    publicComponents: PublicComponent[],
  ) {
    return publicComponents.map((publicComponent, index) => {
      const zoneLetter = this.config.zones[index];
      const privateId = `prv-${zoneLetter}`;
      const subnetNumber = getPrivateSubnetNumber(index);

      return new PrivateComponent(this, privateId, {
        publicSubnetId: publicComponent.artifacts.subnetId,
        egressOnlyInternetGatewayId:
          baseComponent.artifacts.egressOnlyInternetGatewayId,
        internetGatewayId: baseComponent.artifacts.internetGatewayId,
        internetAccessMode: this.config.internetAccessMode,
        availabilityZone: getZoneName(this.provider, zoneLetter),
        vpcId: baseComponent.artifacts.vpcId,
        cidrBlock: getCidrBlockForIndex(
          baseComponent.artifacts.cidrBlock,
          subnetNumber,
        ),
        ipv6CidrBlock: getCidrBlockForIndex(
          baseComponent.artifacts.ipv6CidrBlock,
          subnetNumber,
        ),
      });
    });
  }
}
