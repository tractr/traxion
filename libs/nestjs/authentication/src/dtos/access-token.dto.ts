import { Field, ObjectType } from '@nestjs/graphql';

export interface AccessTokenDto {
  accessToken: string;
}

@ObjectType()
export class AccessTokenGraphQLDto {
  @Field()
  accessToken!: string;
}
