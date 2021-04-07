
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserInclude } from '@generated/models';
export class UserFindUniqueQueryDto {
  @IsString({ each: true })
  @IsIn(Object.values(UserInclude),
    { each: true }
  )
  @IsOptional()
  populate?: UserInclude[];
}
