import { IsString } from 'class-validator';

import { TransformStringToArrayOfString } from '@tractr/common';

export class TerraformEnvironmentVariables {
  @IsString()
  PROJECT_CODE!: string;

  @IsString()
  DOMAIN_NAME!: string;

  @IsString()
  @TransformStringToArrayOfString()
  AWS_AVAILABILITY_ZONES!: string[];
}
