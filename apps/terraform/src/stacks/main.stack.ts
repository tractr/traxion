import { Construct } from 'constructs';

import {
  ApiConfig,
  PostgresConfig,
  PwaConfig,
  ReverseProxyConfig,
} from '../configs/apps.config';
import { TerraformEnvironmentVariables } from '../dtos';

import { ApiComponent } from '@tractr/terraform-api-service';
import { AwsStack, AwsStackConfig } from '@tractr/terraform-aws-stack';
import { NetworkGroup } from '@tractr/terraform-network-group';
import { PoolGroup } from '@tractr/terraform-pool-group';
import { PostgresComponent } from '@tractr/terraform-postgres-service';
import { PwaComponent } from '@tractr/terraform-pwa-service';
import {
  guessNxDockerizedAppsNames,
  RegistryGroup,
} from '@tractr/terraform-registry-group';
import { ZoneGroup } from '@tractr/terraform-zone-group';

export class MainStack extends AwsStack<AwsStackConfig> {
  protected readonly registryGroup: RegistryGroup;

  protected readonly zoneGroup: ZoneGroup;

  protected readonly networkGroup: NetworkGroup;

  protected readonly poolGroup: PoolGroup;

  constructor(
    scope: Construct,
    id: string,
    config: AwsStackConfig,
    terraformEnvs: TerraformEnvironmentVariables,
  ) {
    super(scope, id, config);

    const { PROJECT_CODE, DOMAIN_NAME, AWS_AVAILABILITY_ZONES } = terraformEnvs;

    // Add a registry for each apps that need to build a docker container
    this.registryGroup = new RegistryGroup(this, 'registry', {
      appsPath: guessNxDockerizedAppsNames(),
      projectCode: PROJECT_CODE,
    });

    // Add a zone group to aws
    this.zoneGroup = new ZoneGroup(this, 'zone', {
      domainName: DOMAIN_NAME,
    });

    // Add a network group to aws
    this.networkGroup = new NetworkGroup(this, 'network', {
      zones: AWS_AVAILABILITY_ZONES,
    });

    // Add the pool group that will host our container
    this.poolGroup = new PoolGroup(this, 'pool', {
      registryGroup: this.registryGroup,
      networkGroup: this.networkGroup,
      zoneGroup: this.zoneGroup,
      reverseProxyConfig: ReverseProxyConfig,
    });

    // Add a pwa as a http service
    this.poolGroup.addHttpService(PwaComponent, 'pwa', PwaConfig);

    // Add a pwa as a http service
    const api = this.poolGroup.addHttpService(ApiComponent, 'api', ApiConfig);

    // Add a postgres as a backend service
    this.poolGroup.addBackendService(
      PostgresComponent,
      'postgres',
      [api],
      PostgresConfig,
    );
  }
}
