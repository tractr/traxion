
import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

import { MessageInclude } from '@generated/models';
export class MessageFindUniqueQueryDto {
  @IsString({ each: true })
  @IsIn(MessageInclude,
    { each: true }
  )
  @IsOptional()
  populate?: MessageInclude[];
}
