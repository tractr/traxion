import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskUpdateWithoutSharedWithInput } from './task-update-without-shared-with.input';

@InputType()
export class TaskUpdateWithWhereUniqueWithoutSharedWithInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;

  @Field(() => TaskUpdateWithoutSharedWithInput, { nullable: false })
  @Type(() => TaskUpdateWithoutSharedWithInput)
  data!: TaskUpdateWithoutSharedWithInput;
}
