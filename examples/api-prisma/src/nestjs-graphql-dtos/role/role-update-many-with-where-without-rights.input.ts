import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleScalarWhereInput } from './role-scalar-where.input';
import { Type } from 'class-transformer';
import { RoleUpdateManyMutationInput } from './role-update-many-mutation.input';

@InputType()
export class RoleUpdateManyWithWhereWithoutRightsInput {
  @Field(() => RoleScalarWhereInput, { nullable: false })
  @Type(() => RoleScalarWhereInput)
  where!: RoleScalarWhereInput;

  @Field(() => RoleUpdateManyMutationInput, { nullable: false })
  @Type(() => RoleUpdateManyMutationInput)
  data!: RoleUpdateManyMutationInput;
}
