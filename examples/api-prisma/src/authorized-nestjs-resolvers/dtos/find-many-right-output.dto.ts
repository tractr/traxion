import { Field, ObjectType } from '@nestjs/graphql';

import { Right } from '../../nestjs-graphql-dtos';

import { FindManyPagination } from '@trxn/nestjs-graphql';

@ObjectType()
export class FindManyRightOutput extends FindManyPagination {
  @Field(() => [Right])
  rights!: Right[];
}
