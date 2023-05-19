import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateManyAuthorInput } from './task-create-many-author.input';

@InputType()
export class TaskCreateManyAuthorInputEnvelope {
  @Field(() => [TaskCreateManyAuthorInput], { nullable: false })
  @Type(() => TaskCreateManyAuthorInput)
  data!: Array<TaskCreateManyAuthorInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
