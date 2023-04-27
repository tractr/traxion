import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightUpdateWithoutRolesInput } from './right-update-without-roles.input';
import { RightWhereUniqueInput } from './right-where-unique.input';

@InputType()
export class RightUpdateWithWhereUniqueWithoutRolesInput {
  @Field(() => RightWhereUniqueInput, { nullable: false })
  @Type(() => RightWhereUniqueInput)
  where!: RightWhereUniqueInput;

  @Field(() => RightUpdateWithoutRolesInput, { nullable: false })
  @Type(() => RightUpdateWithoutRolesInput)
  data!: RightUpdateWithoutRolesInput;
}
