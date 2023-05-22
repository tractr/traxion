import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateInput } from './task-create.input';

@ArgsType()
export class CreateOneTaskArgs {
  @Field(() => TaskCreateInput, { nullable: false })
  @Type(() => TaskCreateInput)
  data!: TaskCreateInput;
}
