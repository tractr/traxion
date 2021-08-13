import { Codepipeline, CodepipelineStage } from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import { AwsComponent } from '../../../abstracts/aws.component';
import { AwsProviderConstruct } from '../../../abstracts/aws.interface';

export interface DeploymentTrigger {
  repositoryName: string;
  imageTag: string;
}

export interface DeploymentPipelineComponentConfig extends ConstructOptions {
  storeS3Name: string;
  roleArn: string;
  buildProjectName: string;
  triggers: DeploymentTrigger[];
  clusterName: string;
  serviceName: string;
}
// https://github.com/ispec-inc/terraform-aws-ecs-deploy-pipeline/blob/master/modules/pipeline
export class DeploymentPipelineComponent extends AwsComponent<DeploymentPipelineComponentConfig> {
  protected readonly codepipeline: Codepipeline;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: DeploymentPipelineComponentConfig,
  ) {
    super(scope, id, config);

    this.codepipeline = this.createCodepipeline();
  }

  protected createCodepipeline() {
    return new Codepipeline(this, 'run', {
      provider: this.provider,
      roleArn: this.config.roleArn,
      artifactStore: [
        {
          location: this.config.storeS3Name,
          type: 'S3',
        },
      ],
      stage: [
        this.getSourceStage(),
        this.getBuildStage(),
        this.getDeployStage(),
      ],
      name: this.getResourceName('run'),
    });
  }

  protected getSourceStage(): CodepipelineStage {
    return {
      name: 'Source',
      action: this.config.triggers.map((trigger) => ({
        name: `ECR-${this.getImageName(trigger.repositoryName)}`,
        category: 'Source',
        owner: 'AWS',
        provider: 'ECR',
        version: '1',
        outputArtifacts: [this.getArtifactsName(trigger)],
        configuration: {
          RepositoryName: trigger.repositoryName,
          ImageTag: trigger.imageTag,
        },
      })),
    };
  }

  protected getBuildStage(): CodepipelineStage {
    return {
      name: 'Build',
      action: [
        {
          name: 'Build',
          category: 'Build',
          owner: 'AWS',
          provider: 'CodeBuild',
          version: '1',
          inputArtifacts: this.config.triggers.map((trigger) =>
            this.getArtifactsName(trigger),
          ),
          outputArtifacts: ['definitions'],
          configuration: {
            ProjectName: this.config.buildProjectName,
          },
        },
      ],
    };
  }

  protected getDeployStage(): CodepipelineStage {
    return {
      name: 'Deploy',
      action: [
        {
          name: 'ECS',
          category: 'Deploy',
          owner: 'AWS',
          provider: 'ECS',
          version: '1',
          inputArtifacts: ['definitions'],
          configuration: {
            ClusterName: this.config.clusterName,
            ServiceName: this.config.serviceName,
            FileName: 'imagedefinitions.json',
          },
        },
      ],
    };
  }

  protected getArtifactsName(trigger: DeploymentTrigger): string {
    return `details-${this.getImageName(trigger.repositoryName)}`;
  }

  protected getImageName(repositoryName: string): string {
    return repositoryName.split('/').reverse()[0];
  }

  getCodepipelineArnAsToken(): string {
    return Token.asString(this.codepipeline.arn);
  }
}
