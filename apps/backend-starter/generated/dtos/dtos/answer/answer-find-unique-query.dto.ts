
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

import { AnswerInclude } from '@generated/models';
export class AnswerFindUniqueQueryDto {
  @IsString({ each: true })
  @IsIn(Object.values(AnswerInclude),
    { each: true }
  )
  @IsOptional()
  populate?: AnswerInclude[];
}
