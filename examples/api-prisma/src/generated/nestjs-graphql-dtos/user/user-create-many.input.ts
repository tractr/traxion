import { Field, InputType, Int } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';

@InputType()
export class UserCreateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<keyof typeof Role>;
}
