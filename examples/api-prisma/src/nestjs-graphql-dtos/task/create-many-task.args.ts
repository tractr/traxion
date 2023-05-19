import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateManyInput } from './task-create-many.input';

@ArgsType()
export class CreateManyTaskArgs {
  @Field(() => [TaskCreateManyInput], { nullable: false })
  @Type(() => TaskCreateManyInput)
  data!: Array<TaskCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
