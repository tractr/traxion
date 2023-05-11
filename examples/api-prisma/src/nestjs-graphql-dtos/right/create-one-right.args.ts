import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RightCreateInput } from './right-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneRightArgs {
  @Field(() => RightCreateInput, { nullable: false })
  @Type(() => RightCreateInput)
  data!: RightCreateInput;
}
