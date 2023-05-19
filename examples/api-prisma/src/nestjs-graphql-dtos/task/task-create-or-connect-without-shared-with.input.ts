import { Field , InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateWithoutSharedWithInput } from './task-create-without-shared-with.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateOrConnectWithoutSharedWithInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;

  @Field(() => TaskCreateWithoutSharedWithInput, { nullable: false })
  @Type(() => TaskCreateWithoutSharedWithInput)
  create!: TaskCreateWithoutSharedWithInput;
}
