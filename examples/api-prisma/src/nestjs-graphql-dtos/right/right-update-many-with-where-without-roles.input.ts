import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightScalarWhereInput } from './right-scalar-where.input';
import { RightUpdateManyMutationInput } from './right-update-many-mutation.input';

@InputType()
export class RightUpdateManyWithWhereWithoutRolesInput {
  @Field(() => RightScalarWhereInput, { nullable: false })
  @Type(() => RightScalarWhereInput)
  where!: RightScalarWhereInput;

  @Field(() => RightUpdateManyMutationInput, { nullable: false })
  @Type(() => RightUpdateManyMutationInput)
  data!: RightUpdateManyMutationInput;
}
