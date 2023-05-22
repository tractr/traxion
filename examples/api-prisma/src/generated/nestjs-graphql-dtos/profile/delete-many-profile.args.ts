import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProfileWhereInput } from './profile-where.input';

@ArgsType()
export class DeleteManyProfileArgs {
  @Field(() => ProfileWhereInput, { nullable: true })
  @Type(() => ProfileWhereInput)
  where?: ProfileWhereInput;
}
