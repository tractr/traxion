import {
  Right,
  Role,
  FindUniqueRightArgs,
  FindManyRightArgs,
  CreateOneRightArgs,
  UpdateOneRightArgs,
  DeleteOneRightArgs,
} from '../../nestjs-graphql-dtos';
import {
  RightService,
  RIGHT_SERVICE,
  RightDefaultService,
  RIGHT_DEFAULT_SERVICE,
} from '../../nestjs-services';
import { Inject } from '@nestjs/common';
import {
  Args,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { FindManyRightOutput } from '../dtos';

@Resolver(() => Right)
export class RightResolver {
  constructor(
    @Inject(RIGHT_SERVICE) private readonly rightService: RightService,
    @Inject(RIGHT_DEFAULT_SERVICE)
    private readonly rightDefaultService: RightDefaultService,
  ) {}

  /** Query for a unique right */
  @Query(() => Right, { nullable: true })
  async findUniqueRight(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueRightArgs,
  ) {
    const select = new PrismaSelect(info).value;
    const right = await this.rightService.findUnique({ where, ...select });
    return right;
  }

  /** Query for multiple rights. */
  @Query(() => FindManyRightOutput)
  async findManyRights(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true })
    {
      where,
      cursor,
      distinct,
      orderBy = [{ id: 'asc' }],
      skip = 0,
      take = 100,
    }: FindManyRightArgs,
  ) {
    const select = new PrismaSelect(info).valueOf('rights', 'Right');

    const rights = await this.rightService.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    });

    const count = await this.rightService.count({
      where,
    });

    return {
      rights: rights.slice(0, take),
      count,
      hasNextPage: typeof rights[take] !== 'undefined',
    };
  }

  /** Create a single right. */
  @Mutation(() => Right, { nullable: true })
  async createRight(
    @Info() info: GraphQLResolveInfo,
    @Args() { data: rawData }: CreateOneRightArgs,
  ) {
    const select = new PrismaSelect(info).value;

    const data = {
      ...this.rightDefaultService.getDefaultInternals(),
      ...rawData,
    };

    const right = await this.rightService.create({ data, ...select });

    return right;
  }

  /** Update a single right. */
  @Mutation(() => Right, { nullable: true })
  async updateRight(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneRightArgs,
  ) {
    const select = new PrismaSelect(info).value;

    const right = await this.rightService.update({ where, data, ...select });

    return right;
  }

  /** Delete a single Right. */
  @Mutation(() => Right, { nullable: true })
  async deleteRight(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneRightArgs,
  ) {
    const select = new PrismaSelect(info).value;

    const right = await this.rightService.delete({ where, ...select });

    return right;
  }

  @ResolveField(() => Role)
  roles(@Parent() right: Right) {
    return right.roles;
  }
}
