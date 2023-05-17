import { ArgsType , Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskWhereUniqueInput } from './task-where-unique.input';


@ArgsType()
export class DeleteOneTaskArgs {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: TaskWhereUniqueInput;
}
