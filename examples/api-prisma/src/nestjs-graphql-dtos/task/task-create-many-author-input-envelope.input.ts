import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TaskCreateManyAuthorInput } from './task-create-many-author.input';
import { Type } from 'class-transformer';

@InputType()
export class TaskCreateManyAuthorInputEnvelope {
  @Field(() => [TaskCreateManyAuthorInput], { nullable: false })
  @Type(() => TaskCreateManyAuthorInput)
  data!: Array<TaskCreateManyAuthorInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
