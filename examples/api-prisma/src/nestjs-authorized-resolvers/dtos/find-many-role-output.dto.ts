import { Role } from '../../nestjs-graphql-dtos';
import { FindManyPagination } from '@trxn/nestjs-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FindManyRoleOutput extends FindManyPagination {
  @Field(() => [Role])
  roles!: Role[];
}
