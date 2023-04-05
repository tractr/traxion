import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightUpdateManyMutationInput } from './right-update-many-mutation.input';
import { RightWhereInput } from './right-where.input';

@ArgsType()
export class UpdateManyRightArgs {
  @Field(() => RightUpdateManyMutationInput, { nullable: false })
  @Type(() => RightUpdateManyMutationInput)
  data!: RightUpdateManyMutationInput;

  @Field(() => RightWhereInput, { nullable: true })
  @Type(() => RightWhereInput)
  where?: RightWhereInput;
}
