import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  name!: string | null;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => Int, { nullable: false })
  roleId!: number;
}
