import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateWithoutAuthorInput } from './task-create-without-author.input';
import { TaskUpdateWithoutAuthorInput } from './task-update-without-author.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpsertWithWhereUniqueWithoutAuthorInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;

  @Field(() => TaskUpdateWithoutAuthorInput, { nullable: false })
  @Type(() => TaskUpdateWithoutAuthorInput)
  update!: TaskUpdateWithoutAuthorInput;

  @Field(() => TaskCreateWithoutAuthorInput, { nullable: false })
  @Type(() => TaskCreateWithoutAuthorInput)
  create!: TaskCreateWithoutAuthorInput;
}
