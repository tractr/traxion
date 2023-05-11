import { ObjectType } from '@nestjs/graphql';

export interface AccessTokenDto {
  accessToken: string;
}

@ObjectType()
export class AccessTokenGraphQLDto {
  accessToken!: string;
}
