import { codebuild } from '@cdktf/provider-aws';

export interface DeploymentBuildComponentConfig {
  roleArn: string;
  imageDefinitions: string;
}
export interface DeploymentBuildComponentArtifacts {
  project: codebuild.CodebuildProject;
}
