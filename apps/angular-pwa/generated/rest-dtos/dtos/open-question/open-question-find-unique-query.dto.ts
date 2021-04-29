
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

import { OpenQuestionInclude } from '@generated/models';
export class OpenQuestionFindUniqueQueryDto {
  @IsString({ each: true })
  @IsIn(OpenQuestionInclude,
    { each: true }
  )
  @IsOptional()
  populate?: OpenQuestionInclude[];
}
