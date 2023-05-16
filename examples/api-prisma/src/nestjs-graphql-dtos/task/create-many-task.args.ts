import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TaskCreateManyInput } from './task-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyTaskArgs {
  @Field(() => [TaskCreateManyInput], { nullable: false })
  @Type(() => TaskCreateManyInput)
  data!: Array<TaskCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
