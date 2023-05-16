import { Field, InputType } from '@nestjs/graphql';

import { Role } from './role.enum';

@InputType()
export class EnumRoleNullableListFilter {
  @Field(() => [Role], { nullable: true })
  equals?: Array<keyof typeof Role>;

  @Field(() => Role, { nullable: true })
  has?: keyof typeof Role;

  @Field(() => [Role], { nullable: true })
  hasEvery?: Array<keyof typeof Role>;

  @Field(() => [Role], { nullable: true })
  hasSome?: Array<keyof typeof Role>;

  @Field(() => Boolean, { nullable: true })
  isEmpty?: boolean;
}
