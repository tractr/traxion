import { Construct } from 'constructs';
import * as deepmerge from 'deepmerge';

import {
  ApiConfig,
  PostgresConfig,
  PwaConfig,
  ReverseProxyConfig,
} from '../configs/apps.config';
import { Environments } from '../configs/environments.config';
import { TerraformEnvironmentVariables } from '../dtos';

import {
  ApiComponent,
  ApiComponentPublicConfig,
} from '@tractr/terraform-api-service';
import { AwsStack, AwsStackConfig } from '@tractr/terraform-aws-stack';
import { NetworkGroup } from '@tractr/terraform-network-group';
import { PoolGroup } from '@tractr/terraform-pool-group';
import { PostgresComponent } from '@tractr/terraform-postgres-service';
import {
  PwaComponent,
  PwaComponentPublicConfig,
} from '@tractr/terraform-pwa-service';
import {
  guessNxDockerizedAppsNames,
  RegistryGroup,
} from '@tractr/terraform-registry-group';
import { ZoneGroup } from '@tractr/terraform-zone-group';

export class MainStack extends AwsStack<AwsStackConfig> {
  protected readonly registryGroup: RegistryGroup;

  protected readonly zoneGroup: ZoneGroup;

  protected readonly networkGroup: NetworkGroup;

  protected readonly poolGroups: PoolGroup[] = [];

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

    // Create a pool for each environment
    for (const environment of Environments) {
      // Add the pool group that will host our container
      const poolGroup = new PoolGroup(this, environment.resourceId, {
        registryGroup: this.registryGroup,
        networkGroup: this.networkGroup,
        zoneGroup: this.zoneGroup,
        reverseProxyConfig: ReverseProxyConfig,
        subDomain: environment.subDomain,
      });

      // Add a pwa as a http service
      const pwaOverrideConfig: PwaComponentPublicConfig = {
        containerConfig: { imageTag: environment.pwaImageTag },
      };
      const mergedPwaConfig = deepmerge(PwaConfig, pwaOverrideConfig);
      poolGroup.addHttpService(PwaComponent, 'pwa', mergedPwaConfig);

      // Add a api as a http service
      const apiOverrideConfig: ApiComponentPublicConfig = {
        containerConfig: { imageTag: environment.apiImageTag },
      };
      const mergedApiConfig = deepmerge(ApiConfig, apiOverrideConfig);
      const api = poolGroup.addHttpService(
        ApiComponent,
        'api',
        mergedApiConfig,
      );

      // Add a postgres as a backend service
      poolGroup.addBackendService(
        PostgresComponent,
        'postgres',
        [api],
        PostgresConfig,
      );

      // Store group
      this.poolGroups.push(poolGroup);
    }
  }
}
