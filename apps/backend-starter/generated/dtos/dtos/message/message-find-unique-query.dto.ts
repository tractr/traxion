
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

import { MessageInclude } from '@generated/models';
export class MessageFindUniqueQueryDto {
  @IsString({ each: true })
  @IsIn(Object.values(MessageInclude),
    { each: true }
  )
  @IsOptional()
  populate?: MessageInclude[];
}
