import { codebuild, iam } from '@cdktf/provider-aws';

export interface DeploymentBuildComponentConfig {
  role: iam.IamRole;
  imageDefinitions: string;
}
export interface DeploymentBuildComponentArtifacts {
  project: codebuild.CodebuildProject;
}
