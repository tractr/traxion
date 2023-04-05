import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Role } from '../role/role.model';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  name!: string | null;

  @Field(() => Int, { nullable: false })
  roleId!: number;

  @Field(() => Role, { nullable: false })
  role?: Role;
}
