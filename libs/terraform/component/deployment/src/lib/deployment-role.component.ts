import { iam } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface DeploymentRoleComponentConfig {
  storeS3Arn: string;
}

export class DeploymentRoleComponent extends AwsComponent<DeploymentRoleComponentConfig> {
  protected readonly iamRole: iam.IamRole;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: DeploymentRoleComponentConfig,
  ) {
    super(scope, id, config);

    this.iamRole = this.createIamRole();
  }

  protected createIamRole() {
    // ECS task execution roles
    return new iam.IamRole(this, 'role', {
      provider: this.provider,
      assumeRolePolicy: this.getAssumeRolePolicy(),
      inlinePolicy: this.getInlinePolicy(),
      name: this.getResourceName('role'),
    });
  }

  protected getAssumeRolePolicy(): string {
    return JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Service: 'codepipeline.amazonaws.com',
          },
          Action: 'sts:AssumeRole',
        },
        {
          Effect: 'Allow',
          Principal: {
            Service: 'codebuild.amazonaws.com',
          },
          Action: 'sts:AssumeRole',
        },
      ],
    });
  }

  protected getInlinePolicy(): iam.IamRoleInlinePolicy[] {
    return [
      {
        name: this.getResourceName('policy'),
        policy: JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: [
                's3:GetObject',
                's3:GetObjectVersion',
                's3:GetBucketVersioning',
                's3:List*',
                's3:PutObject',
              ],
              Resource: [
                `${this.config.storeS3Arn}`,
                `${this.config.storeS3Arn}/*`,
              ],
            },

            {
              Action: ['iam:PassRole'],
              Resource: '*',
              Effect: 'Allow',
              Condition: {
                StringEqualsIfExists: {
                  'iam:PassedToService': [
                    'cloudformation.amazonaws.com',
                    'elasticbeanstalk.amazonaws.com',
                    'ec2.amazonaws.com',
                    'ecs-tasks.amazonaws.com',
                  ],
                },
              },
            },
            {
              Action: [
                'codecommit:CancelUploadArchive',
                'codecommit:GetBranch',
                'codecommit:GetCommit',
                'codecommit:GetRepository',
                'codecommit:GetUploadArchiveStatus',
                'codecommit:UploadArchive',
              ],
              Resource: '*',
              Effect: 'Allow',
            },
            {
              Action: [
                'codedeploy:CreateDeployment',
                'codedeploy:GetApplication',
                'codedeploy:GetApplicationRevision',
                'codedeploy:GetDeployment',
                'codedeploy:GetDeploymentConfig',
                'codedeploy:RegisterApplicationRevision',
              ],
              Resource: '*',
              Effect: 'Allow',
            },
            {
              Action: ['codestar-connections:UseConnection'],
              Resource: '*',
              Effect: 'Allow',
            },
            {
              Action: [
                'elasticbeanstalk:*',
                'ec2:*',
                'elasticloadbalancing:*',
                'autoscaling:*',
                'cloudwatch:*',
                's3:*',
                'sns:*',
                'cloudformation:*',
                'rds:*',
                'sqs:*',
                'ecs:*',
              ],
              Resource: '*',
              Effect: 'Allow',
            },
            {
              Action: ['lambda:InvokeFunction', 'lambda:ListFunctions'],
              Resource: '*',
              Effect: 'Allow',
            },
            {
              Action: [
                'opsworks:CreateDeployment',
                'opsworks:DescribeApps',
                'opsworks:DescribeCommands',
                'opsworks:DescribeDeployments',
                'opsworks:DescribeInstances',
                'opsworks:DescribeStacks',
                'opsworks:UpdateApp',
                'opsworks:UpdateStack',
              ],
              Resource: '*',
              Effect: 'Allow',
            },
            {
              Action: [
                'cloudformation:CreateStack',
                'cloudformation:DeleteStack',
                'cloudformation:DescribeStacks',
                'cloudformation:UpdateStack',
                'cloudformation:CreateChangeSet',
                'cloudformation:DeleteChangeSet',
                'cloudformation:DescribeChangeSet',
                'cloudformation:ExecuteChangeSet',
                'cloudformation:SetStackPolicy',
                'cloudformation:ValidateTemplate',
              ],
              Resource: '*',
              Effect: 'Allow',
            },
            {
              Action: [
                'codebuild:BatchGetBuilds',
                'codebuild:StartBuild',
                'codebuild:BatchGetBuildBatches',
                'codebuild:StartBuildBatch',
              ],
              Resource: '*',
              Effect: 'Allow',
            },
            {
              Effect: 'Allow',
              Action: [
                'devicefarm:ListProjects',
                'devicefarm:ListDevicePools',
                'devicefarm:GetRun',
                'devicefarm:GetUpload',
                'devicefarm:CreateUpload',
                'devicefarm:ScheduleRun',
              ],
              Resource: '*',
            },
            {
              Effect: 'Allow',
              Action: [
                'servicecatalog:ListProvisioningArtifacts',
                'servicecatalog:CreateProvisioningArtifact',
                'servicecatalog:DescribeProvisioningArtifact',
                'servicecatalog:DeleteProvisioningArtifact',
                'servicecatalog:UpdateProduct',
              ],
              Resource: '*',
            },
            {
              Effect: 'Allow',
              Action: ['cloudformation:ValidateTemplate'],
              Resource: '*',
            },
            {
              Effect: 'Allow',
              Action: ['ecr:DescribeImages'],
              Resource: '*',
            },
            {
              Effect: 'Allow',
              Action: [
                'states:DescribeExecution',
                'states:DescribeStateMachine',
                'states:StartExecution',
              ],
              Resource: '*',
            },
            {
              Effect: 'Allow',
              Action: [
                'appconfig:StartDeployment',
                'appconfig:StopDeployment',
                'appconfig:GetDeployment',
              ],
              Resource: '*',
            },
          ],
        }),
      },
    ];
  }

  getIamRoleArnAsToken(): string {
    return Token.asString(this.iamRole.arn);
  }
}
