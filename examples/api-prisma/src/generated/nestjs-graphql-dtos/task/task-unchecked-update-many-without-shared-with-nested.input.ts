import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUncheckedUpdateManyWithoutSharedWithNestedInput {
  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  set?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;
}
