import { codepipeline } from '@cdktf/provider-aws';

import {
  DeploymentPipelineComponentArtifacts,
  DeploymentPipelineComponentConfig,
  DeploymentTrigger,
} from './interfaces';

import { AwsComponent } from '@trxn/terraform-component-aws';

// https://github.com/ispec-inc/terraform-aws-ecs-deploy-pipeline/blob/master/modules/pipeline
export class DeploymentPipelineComponent extends AwsComponent<
  DeploymentPipelineComponentConfig,
  DeploymentPipelineComponentArtifacts
> {
  protected createComponents(): void {
    const pipeline = this.createPipeline();
    // Populate artifacts
    this.artifacts = { pipeline };
  }

  protected createPipeline() {
    return new codepipeline.Codepipeline(this, 'run', {
      roleArn: this.config.role.arn,
      artifactStore: [
        {
          location: this.config.storeS3Bucket.bucket,
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

  protected getSourceStage(): codepipeline.CodepipelineStage {
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

  protected getBuildStage(): codepipeline.CodepipelineStage {
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
            ProjectName: this.config.buildProject.name,
          },
        },
      ],
    };
  }

  protected getDeployStage(): codepipeline.CodepipelineStage {
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
            ClusterName: this.config.cluster.name,
            ServiceName: this.config.service.name,
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
}
