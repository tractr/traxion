import { efs, vpc } from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import * as md5 from 'md5';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface VolumeComponentConfig {
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
  preventDestroy?: boolean;
  enableBackups?: boolean;
}

export class VolumeComponent<
  T extends VolumeComponentConfig = VolumeComponentConfig,
> extends AwsComponent<T> {
  protected readonly securityGroup: vpc.SecurityGroup;

  protected readonly efsFileSystem: efs.EfsFileSystem;

  protected readonly efsBackupPolicy: efs.EfsBackupPolicy | undefined;

  protected readonly efsMountTargets: efs.EfsMountTarget[];

  constructor(scope: AwsProviderConstruct, id: string, config: T) {
    super(scope, id, config);
    this.securityGroup = this.createSecurityGroup();
    this.efsFileSystem = this.createEfsFileSystem();
    if (this.config.enableBackups) {
      this.efsBackupPolicy = this.createEfsBackupPolicy();
    }
    this.efsMountTargets = this.createEfsMountTargets();
  }

  protected createSecurityGroup() {
    return new vpc.SecurityGroup(this, 'sg', {
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
    return new efs.EfsFileSystem(this, 'fs', {
      creationToken: md5(this.getResourceName('fs')),
      encrypted: true,
      performanceMode: this.config.performanceMode || 'generalPurpose',
      lifecyclePolicy: [
        { transitionToIa: this.config.transitionToIa || 'AFTER_90_DAYS' },
      ],
      lifecycle: { preventDestroy: !!this.config.preventDestroy },
      tags: this.getResourceNameAsTag('fs'),
    });
  }

  protected createEfsBackupPolicy() {
    return new efs.EfsBackupPolicy(this, 'bck', {
      fileSystemId: this.getFileSystemIdAsToken(),
      backupPolicy: { status: 'ENABLED' },
    });
  }

  protected createEfsMountTargets() {
    return this.config.subnetsIds.map((subnetId, index) =>
      this.createEfsMountTarget(subnetId, index),
    );
  }

  protected createEfsMountTarget(subnetId: string, index: number) {
    return new efs.EfsMountTarget(this, `mount-${index}`, {
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
