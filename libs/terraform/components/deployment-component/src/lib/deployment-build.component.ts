import { CodebuildProject } from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';

export interface DeploymentBuildComponentConfig extends ConstructOptions {
  roleArn: string;
  imageDefinitions: string;
}

export class DeploymentBuildComponent extends AwsComponent<DeploymentBuildComponentConfig> {
  protected readonly codebuildProject: CodebuildProject;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: DeploymentBuildComponentConfig,
  ) {
    super(scope, id, config);
    this.codebuildProject = this.createCodebuildProject();
  }

  protected createCodebuildProject() {
    return new CodebuildProject(this, 'zip', {
      provider: this.provider,
      buildTimeout: 5,
      serviceRole: this.config.roleArn,
      source: [
        {
          type: 'NO_SOURCE',
          buildspec: this.getBuildSpecs(),
        },
      ],
      environment: [
        {
          image: 'aws/codebuild/standard:5.0',
          computeType: 'BUILD_GENERAL1_SMALL',
          type: 'LINUX_CONTAINER',
        },
      ],
      artifacts: [
        {
          type: 'NO_ARTIFACTS',
        },
      ],
      logsConfig: [
        {
          s3Logs: [{ status: 'DISABLED' }],
          cloudwatchLogs: [{ status: 'DISABLED' }],
        },
      ],
      name: this.getResourceName('zip'),
    });
  }

  getProjectNameAsToken(): string {
    return Token.asString(this.codebuildProject.name);
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
