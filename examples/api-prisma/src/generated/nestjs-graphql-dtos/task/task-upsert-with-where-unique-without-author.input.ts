import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { TaskCreateWithoutAuthorInput } from './task-create-without-author.input';
import { TaskUpdateWithoutAuthorInput } from './task-update-without-author.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpsertWithWhereUniqueWithoutAuthorInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateWithoutAuthorInput, { nullable: false })
  @Type(() => TaskUpdateWithoutAuthorInput)
  update!: TaskUpdateWithoutAuthorInput;

  @Field(() => TaskCreateWithoutAuthorInput, { nullable: false })
  @Type(() => TaskCreateWithoutAuthorInput)
  create!: TaskCreateWithoutAuthorInput;
}
