
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

import { AnswerInclude } from '@generated/models';
export class AnswerFindUniqueQueryDto {
  @IsString({ each: true })
  @IsIn(AnswerInclude,
    { each: true }
  )
  @IsOptional()
  populate?: AnswerInclude[];
}
