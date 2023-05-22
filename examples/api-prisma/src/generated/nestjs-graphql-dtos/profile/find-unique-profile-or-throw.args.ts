import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProfileWhereUniqueInput } from './profile-where-unique.input';

@ArgsType()
export class FindUniqueProfileOrThrowArgs {
  @Field(() => ProfileWhereUniqueInput, { nullable: false })
  @Type(() => ProfileWhereUniqueInput)
  where!: ProfileWhereUniqueInput;
}
