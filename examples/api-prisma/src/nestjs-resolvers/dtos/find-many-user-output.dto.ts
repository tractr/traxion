import { User } from '../../nestjs-graphql-dtos';
import { FindManyPagination } from '@trxn/nestjs-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FindManyUserOutput extends FindManyPagination {
  @Field(() => [User])
  users!: User[];
}
