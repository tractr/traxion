import { Field , InputType , Int } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';

@InputType()
export class UserUncheckedUpdateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<keyof typeof Role>;
}
