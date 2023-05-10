import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RightCreateManyInput } from './right-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyRightArgs {
  @Field(() => [RightCreateManyInput], { nullable: false })
  @Type(() => RightCreateManyInput)
  data!: Array<RightCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
