import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightWhereUniqueInput } from './right-where-unique.input';

@ArgsType()
export class DeleteOneRightArgs {
  @Field(() => RightWhereUniqueInput, { nullable: false })
  @Type(() => RightWhereUniqueInput)
  where!: RightWhereUniqueInput;
}
