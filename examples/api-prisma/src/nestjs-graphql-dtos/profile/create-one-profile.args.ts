import { ArgsType , Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProfileCreateInput } from './profile-create.input';


@ArgsType()
export class CreateOneProfileArgs {
  @Field(() => ProfileCreateInput, { nullable: false })
  @Type(() => ProfileCreateInput)
  data!: ProfileCreateInput;
}
