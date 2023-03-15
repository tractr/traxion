import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightOrderByWithRelationInput } from './right-order-by-with-relation.input';
import { RightScalarFieldEnum } from './right-scalar-field.enum';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { RightWhereInput } from './right-where.input';

@ArgsType()
export class FindManyRightArgs {

    @Field(() => RightWhereInput, {nullable:true})
    @Type(() => RightWhereInput)
    where?: RightWhereInput;

    @Field(() => [RightOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RightOrderByWithRelationInput>;

    @Field(() => RightWhereUniqueInput, {nullable:true})
    cursor?: RightWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [RightScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof RightScalarFieldEnum>;
}
