import { ArgsType , Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProfileCreateManyInput } from './profile-create-many.input';


@ArgsType()
export class CreateManyProfileArgs {
  @Field(() => [ProfileCreateManyInput], { nullable: false })
  @Type(() => ProfileCreateManyInput)
  data!: Array<ProfileCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
