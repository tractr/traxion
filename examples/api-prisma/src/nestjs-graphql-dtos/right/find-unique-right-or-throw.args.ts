import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightWhereUniqueInput } from './right-where-unique.input';

@ArgsType()
export class FindUniqueRightOrThrowArgs {
  @Field(() => RightWhereUniqueInput, { nullable: false })
  @Type(() => RightWhereUniqueInput)
  where!: RightWhereUniqueInput;
}
