import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../../nestjs-graphql-dtos';

@ObjectType()
export class AccessTokenGraphQLDto {
  @Field()
  accessToken!: string;

  @Field(() => User)
  user!: User;
}
