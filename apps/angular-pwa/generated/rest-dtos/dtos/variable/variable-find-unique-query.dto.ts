
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

import { VariableInclude } from '@generated/models';
export class VariableFindUniqueQueryDto {
  @IsString({ each: true })
  @IsIn(VariableInclude,
    { each: true }
  )
  @IsOptional()
  populate?: VariableInclude[];
}
