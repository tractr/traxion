import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RoleWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;
}
