import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { Type } from 'class-transformer';
import { RightUpdateWithoutRolesInput } from './right-update-without-roles.input';
import { RightCreateWithoutRolesInput } from './right-create-without-roles.input';

@InputType()
export class RightUpsertWithWhereUniqueWithoutRolesInput {
  @Field(() => RightWhereUniqueInput, { nullable: false })
  @Type(() => RightWhereUniqueInput)
  where!: RightWhereUniqueInput;

  @Field(() => RightUpdateWithoutRolesInput, { nullable: false })
  @Type(() => RightUpdateWithoutRolesInput)
  update!: RightUpdateWithoutRolesInput;

  @Field(() => RightCreateWithoutRolesInput, { nullable: false })
  @Type(() => RightCreateWithoutRolesInput)
  create!: RightCreateWithoutRolesInput;
}
