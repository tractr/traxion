import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskUpdateInput } from './task-update.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@ArgsType()
export class UpdateOneTaskArgs {
  @Field(() => TaskUpdateInput, { nullable: false })
  @Type(() => TaskUpdateInput)
  data!: TaskUpdateInput;

  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;
}
