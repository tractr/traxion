import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskWhereUniqueInput } from './task-where-unique.input';
import { Type } from 'class-transformer';
import { TaskUpdateWithoutAuthorInput } from './task-update-without-author.input';
import { TaskCreateWithoutAuthorInput } from './task-create-without-author.input';

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
