import { Construct } from 'constructs';

import { apps } from '../../../.traxionrc';
import { getTerraformConfiguration } from './configs';

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

  constructor(scope: Construct, id: string, config: AwsStackConfig) {
    super(scope, id, config);

    const { PROJECT_CODE, DOMAIN_NAME, AWS_AVAILABILITY_ZONES } =
      getTerraformConfiguration();

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
    });

    // Add a pwa as a http service
    this.poolGroup.addHttpService(PwaComponent, 'pwa', {
      ...apps.pwa,
    });

    // Add a pwa as a http service
    const api = this.poolGroup.addHttpService(ApiComponent, 'api', {
      ...apps.api,
    });

    // Add a postgres as a backend service
    this.poolGroup.addBackendService(PostgresComponent, 'postgres', [api]);
  }
}
