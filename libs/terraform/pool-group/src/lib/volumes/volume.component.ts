import {
  EfsFileSystem,
  EfsMountTarget,
  SecurityGroup,
} from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';
import * as md5 from 'md5';

import { AwsComponent } from '../../../abstracts/aws.component';
import { AwsProviderConstruct } from '../../../abstracts/aws.interface';

export interface VolumeComponentConfig extends ConstructOptions {
  vpcId: string;
  subnetsIds: string[];
  clientsSecurityGroupsIds: string[];
  performanceMode?: 'generalPurpose' | 'maxIO';
  transitionToIa?:
    | 'AFTER_7_DAYS'
    | 'AFTER_14_DAYS'
    | 'AFTER_30_DAYS'
    | 'AFTER_60_DAYS'
    | 'AFTER_90_DAYS';
}

export class VolumeComponent<
  T extends VolumeComponentConfig = VolumeComponentConfig,
> extends AwsComponent<T> {
  protected readonly securityGroup: SecurityGroup;

  protected readonly efsFileSystem: EfsFileSystem;

  protected readonly efsMountTargets: EfsMountTarget[];

  constructor(scope: AwsProviderConstruct, id: string, config: T) {
    super(scope, id, config);
    this.securityGroup = this.createSecurityGroup();
    this.efsFileSystem = this.createEfsFileSystem();
    this.efsMountTargets = this.createEfsMountTargets();
  }

  protected createSecurityGroup() {
    return new SecurityGroup(this, 'sg', {
      provider: this.provider,
      ingress: [
        {
          protocol: 'TCP',
          fromPort: 2049,
          toPort: 2049,
          securityGroups: this.config.clientsSecurityGroupsIds,
        },
      ],
      vpcId: this.config.vpcId,
      name: this.getResourceName('sg'),
    });
  }

  protected createEfsFileSystem() {
    return new EfsFileSystem(this, 'fs', {
      creationToken: md5(this.getResourceName('fs')),
      encrypted: true,
      performanceMode: this.config.performanceMode || 'generalPurpose',
      lifecyclePolicy: [
        { transitionToIa: this.config.transitionToIa || 'AFTER_90_DAYS' },
      ],
      tags: this.getResourceNameAsTag('fs'),
    });
  }

  protected createEfsMountTargets() {
    return this.config.subnetsIds.map((subnetId, index) =>
      this.createEfsMountTarget(subnetId, index),
    );
  }

  protected createEfsMountTarget(subnetId: string, index: number) {
    return new EfsMountTarget(this, `mount-${index}`, {
      fileSystemId: this.getFileSystemIdAsToken(),
      securityGroups: [this.getSecurityGroupIdAsToken()],
      subnetId,
    });
  }

  getFileSystemIdAsToken(): string {
    return Token.asString(this.efsFileSystem.id);
  }

  getSecurityGroupIdAsToken(): string {
    return Token.asString(this.securityGroup.id);
  }
}
