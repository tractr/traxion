import { codebuild, codepipeline, ecs, iam, s3 } from '@cdktf/provider-aws';

export interface DeploymentTrigger {
  repositoryName: string;
  imageTag: string;
}

export interface DeploymentPipelineComponentConfig {
  storeS3Bucket: s3.S3Bucket;
  role: iam.IamRole;
  buildProject: codebuild.CodebuildProject;
  triggers: DeploymentTrigger[];
  cluster: ecs.EcsCluster;
  service: ecs.EcsService;
}
export interface DeploymentPipelineComponentArtifacts {
  pipeline: codepipeline.Codepipeline;
}
