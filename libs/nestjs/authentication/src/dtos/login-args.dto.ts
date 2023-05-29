import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginArgsGraphQLDto {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
