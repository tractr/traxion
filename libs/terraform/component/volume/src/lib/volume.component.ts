import { efs, vpc } from '@cdktf/provider-aws';
import * as md5 from 'md5';

import {
  VolumeComponentArtifacts,
  VolumeComponentConfig,
} from './volume.interface';

import { AwsComponent } from '@tractr/terraform-component-aws';

export class VolumeComponent<
  Config extends VolumeComponentConfig = VolumeComponentConfig,
> extends AwsComponent<Config, VolumeComponentArtifacts> {
  protected createComponents(): void {
    const securityGroup = this.createSecurityGroup();
    const efsFileSystem = this.createFileSystem(securityGroup);

    // Populate the artifacts
    this.artifacts = { securityGroup, efsFileSystem };
  }

  /**
   * Creates a security group for the EFS file system.
   * Allow access to the volume consumers by their security group ids.
   */
  protected createSecurityGroup() {
    return new vpc.SecurityGroup(this, 'sg', {
      ingress: [
        {
          protocol: 'TCP',
          fromPort: 2049,
          toPort: 2049,
          securityGroups: this.config.clientsSecurityGroups.map((sg) => sg.id),
        },
      ],
      vpcId: this.config.vpc.id,
      name: this.getResourceName('sg'),
    });
  }

  /**
   * Creates an EFS file system with its backup policy and mount targets.
   * It has one mount target per availability zone, i.e. one per subnet.
   */
  protected createFileSystem(securityGroup: vpc.SecurityGroup) {
    // Create the EFS file system
    const efsFileSystem = new efs.EfsFileSystem(this, 'fs', {
      creationToken: md5(this.getResourceName('fs')),
      encrypted: true,
      performanceMode: this.config.performanceMode || 'generalPurpose',
      lifecyclePolicy: [
        { transitionToIa: this.config.transitionToIa || 'AFTER_90_DAYS' },
      ],
      lifecycle: { preventDestroy: !!this.config.preventDestroy },
      tags: this.getResourceNameAsTag('fs'),
    });

    // Add backup policy if enabled
    if (this.config.enableBackups) {
      /* eslint-disable-next-line no-new */
      new efs.EfsBackupPolicy(this, 'bck', {
        fileSystemId: efsFileSystem.id,
        backupPolicy: { status: 'ENABLED' },
      });
    }

    // Create mount targets for each subnet
    // This allows the volume to be accessible from the network in each subnet
    this.config.subnets.forEach((subnet, index) => {
      /* eslint-disable-next-line no-new */
      new efs.EfsMountTarget(this, `mount-${index}`, {
        fileSystemId: efsFileSystem.id,
        securityGroups: [securityGroup.id],
        subnetId: subnet.id,
      });
    });

    return efsFileSystem;
  }
}
