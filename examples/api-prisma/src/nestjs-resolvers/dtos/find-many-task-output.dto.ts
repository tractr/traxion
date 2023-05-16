import { Task } from '../../nestjs-graphql-dtos';
import { FindManyPagination } from '@trxn/nestjs-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FindManyTaskOutput extends FindManyPagination {
  @Field(() => [Task])
  tasks!: Task[];
}
