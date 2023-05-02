import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightCreateManyInput } from './right-create-many.input';

@ArgsType()
export class CreateManyRightArgs {

    @Field(() => [RightCreateManyInput], {nullable:false})
    @Type(() => RightCreateManyInput)
    data!: Array<RightCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
