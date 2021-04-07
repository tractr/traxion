
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

import { QuestionInclude } from '@generated/models';
export class QuestionFindUniqueQueryDto {
  @IsString({ each: true })
  @IsIn(Object.values(QuestionInclude),
    { each: true }
  )
  @IsOptional()
  populate?: QuestionInclude[];
}
