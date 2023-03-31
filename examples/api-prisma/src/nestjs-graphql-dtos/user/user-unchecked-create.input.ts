import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: false })
  roleId!: number;
}
