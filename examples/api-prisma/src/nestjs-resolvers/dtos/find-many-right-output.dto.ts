import { Field, ObjectType } from '@nestjs/graphql';
import { FindManyPagination } from '@trxn/nestjs-graphql';

import { Right } from '../../nestjs-graphql-dtos';

@ObjectType()
export class FindManyRightOutput extends FindManyPagination {
  @Field(() => [Right])
  rights!: Right[];
}
