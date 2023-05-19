import { Field , InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProfileWhereUniqueInput } from './profile-where-unique.input';

@InputType()
export class ProfileCreateNestedOneWithoutUserInput {
  @Field(() => ProfileWhereUniqueInput, { nullable: true })
  @Type(() => ProfileWhereUniqueInput)
  connect?: ProfileWhereUniqueInput;
}
