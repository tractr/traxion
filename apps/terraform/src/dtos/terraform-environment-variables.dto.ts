import { IsString } from 'class-validator';

import { TransformStringToArrayOfString } from '@tractr/common';

export class TerraformEnvironmentVariables {
  @IsString()
  PROJECT_CODE!: string;

  @IsString()
  DOMAIN_NAME!: string;

  @IsString()
  AWS_REGION!: string;

  @IsString({ each: true })
  @TransformStringToArrayOfString()
  AWS_AVAILABILITY_ZONES!: string[];

  @IsString()
  TERRAFORM_REMOTE_BACKEND_HOST!: string;

  @IsString()
  TERRAFORM_REMOTE_BACKEND_ORG!: string;

  @IsString()
  TERRAFORM_REMOTE_BACKEND_WORKSPACE!: string;
}
