import { TransformStringToArrayOfString } from '@tractr/common';
import { IsString } from 'class-validator';

export class TerraformEnvironmentVariables {
  @IsString()
  PROJECT_CODE!: string;

  @IsString()
  DOMAIN_NAME!: string;

  @IsString()
  AWS_REGION!: string;

  @IsString()
  AWS_ACCESS_KEY_ID!: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY!: string;

  @IsString({ each: true })
  @TransformStringToArrayOfString()
  AWS_AVAILABILITY_ZONES!: string[];

  @IsString()
  TERRAFORM_REMOTE_BACKEND_HOST!: string;

  @IsString()
  TERRAFORM_REMOTE_BACKEND_ORG!: string;

  @IsString()
  TERRAFORM_REMOTE_BACKEND_TOKEN!: string;

  @IsString()
  TERRAFORM_REMOTE_BACKEND_WORKSPACE!: string;
}
