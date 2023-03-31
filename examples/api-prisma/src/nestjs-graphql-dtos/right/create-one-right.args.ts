import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightCreateInput } from './right-create.input';

@ArgsType()
export class CreateOneRightArgs {
  @Field(() => RightCreateInput, { nullable: false })
  @Type(() => RightCreateInput)
  data!: RightCreateInput;
}
