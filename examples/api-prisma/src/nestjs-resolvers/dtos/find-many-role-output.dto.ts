import { Field, ObjectType } from '@nestjs/graphql';
import { FindManyPagination } from '@trxn/nestjs-graphql';

import { Role } from '../../nestjs-graphql-dtos';

@ObjectType()
export class FindManyRoleOutput extends FindManyPagination {
  @Field(() => [Role])
  roles!: Role[];
}
