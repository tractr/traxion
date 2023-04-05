import { Field, ObjectType } from '@nestjs/graphql';
import { FindManyPagination } from '@trxn/nestjs-graphql';

import { User } from '../../nestjs-graphql-dtos';

@ObjectType()
export class FindManyUserOutput extends FindManyPagination {
  @Field(() => [User])
  users!: User[];
}
