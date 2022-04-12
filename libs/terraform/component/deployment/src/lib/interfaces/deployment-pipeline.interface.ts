import { codepipeline } from '@cdktf/provider-aws';

export interface DeploymentTrigger {
  repositoryName: string;
  imageTag: string;
}

export interface DeploymentPipelineComponentConfig {
  storeS3Name: string;
  roleArn: string;
  buildProjectName: string;
  triggers: DeploymentTrigger[];
  clusterName: string;
  serviceName: string;
}
export interface DeploymentPipelineComponentArtifacts {
  pipeline: codepipeline.Codepipeline;
}
