import { Field, ObjectType } from '@nestjs/graphql';

import { Task } from '../../nestjs-graphql-dtos';

import { FindManyPagination } from '@trxn/nestjs-graphql';

@ObjectType()
export class FindManyTaskOutput extends FindManyPagination {
  @Field(() => [Task])
  tasks!: Task[];
}
