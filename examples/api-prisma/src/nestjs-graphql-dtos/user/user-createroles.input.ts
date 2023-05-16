import { Field, InputType } from '@nestjs/graphql';

import { Role } from '../prisma/role.enum';

@InputType()
export class UserCreaterolesInput {
  @Field(() => [Role], { nullable: false })
  set!: Array<keyof typeof Role>;
}
