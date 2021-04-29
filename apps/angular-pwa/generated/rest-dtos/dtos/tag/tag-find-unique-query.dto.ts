
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

import { TagInclude } from '@generated/models';
export class TagFindUniqueQueryDto {
  @IsString({ each: true })
  @IsIn(TagInclude,
    { each: true }
  )
  @IsOptional()
  populate?: TagInclude[];
}
