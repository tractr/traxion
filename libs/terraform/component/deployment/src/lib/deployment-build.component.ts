import { codebuild } from '@cdktf/provider-aws';

import {
  DeploymentBuildComponentArtifacts,
  DeploymentBuildComponentConfig,
} from './interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

export class DeploymentBuildComponent extends AwsComponent<
  DeploymentBuildComponentConfig,
  DeploymentBuildComponentArtifacts
> {
  protected createComponents(): void {
    const project = this.createCodebuildProject();
    // Populate artifacts
    this.artifacts = { project };
  }

  protected createCodebuildProject() {
    return new codebuild.CodebuildProject(this, 'zip', {
      buildTimeout: 5,
      serviceRole: this.config.role.arn,
      source: {
        type: 'NO_SOURCE',
        buildspec: this.getBuildSpecs(),
      },

      environment: {
        image: 'aws/codebuild/standard:5.0',
        computeType: 'BUILD_GENERAL1_SMALL',
        type: 'LINUX_CONTAINER',
      },

      artifacts: {
        type: 'NO_ARTIFACTS',
      },

      logsConfig: {
        s3Logs: { status: 'DISABLED' },
        cloudwatchLogs: { status: 'DISABLED' },
      },

      name: this.getResourceName('zip'),
    });
  }

  protected getBuildSpecs(): string {
    return `version: 0.2

phases:
  build:
    commands:
      - echo "${this.config.imageDefinitions.replace(
        /"/g,
        '\\"',
      )}" > imagedefinitions.json
artifacts:
  files:
    - imagedefinitions.json`;
  }
}
