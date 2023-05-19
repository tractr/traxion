import { Field, InputType } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';

@InputType()
export class UserUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => [Role], { nullable: true })
  roles?: Array<keyof typeof Role>;
}
