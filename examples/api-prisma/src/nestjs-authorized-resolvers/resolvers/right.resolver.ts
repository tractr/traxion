import { ForcedSubject, PureAbility } from '@casl/ability';
import { PrismaQuery } from '@casl/prisma';
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
import { Prisma } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

import {
  RightAuthorizedService,
  RoleAuthorizedService,
} from '../../nestjs-authorized-services';
import {
  CreateOneRightArgs,
  DeleteOneRightArgs,
  FindManyRightArgs,
  FindManyRoleArgs,
  FindUniqueRightArgs,
  Right,
  Role,
  UpdateOneRightArgs,
} from '../../nestjs-graphql-dtos';
import { FindManyRightOutput } from '../dtos';
import {
  CREATE_RIGHT,
  DELETE_RIGHT,
  READ_RIGHT,
  SEARCH_RIGHT,
  UPDATE_RIGHT,
} from '../policies';


import { CurrentAbilities, Policies } from '@trxn/nestjs-core';
import { getPathFromGraphQLResolveInfo } from '@trxn/nestjs-graphql';

@Resolver(() => Right)
export class RightResolver {
  constructor(
    private readonly rightAuthorizedService: RightAuthorizedService,
    private readonly roleAuthorizedService: RoleAuthorizedService,
  ) {}

  /** Query for a unique right */
  @Query(() => Right, { nullable: true })
  @Policies(READ_RIGHT)
  async findUniqueRight(
    @Info() info: GraphQLResolveInfo,
    @Args({ nullable: true, defaultValue: {} }) { where }: FindUniqueRightArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RightArgs;
    const right = await this.rightAuthorizedService.findUnique(
      { where, ...select },
      abilities,
    );
    return right;
  }

  /** Query for multiple rights. */
  @Query(() => FindManyRightOutput)
  @Policies(SEARCH_RIGHT)
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
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).valueOf(
      'rights',
      'Right',
    ) as Prisma.RightArgs;

    const rights = await this.rightAuthorizedService.findMany(
      {
        ...select,
        where,
        cursor,
        distinct,
        orderBy,
        skip,
        take: take + 1,
      },
      abilities,
    );

    const count = await this.rightAuthorizedService.count(
      {
        where,
      },
      abilities,
    );

    return {
      rights: rights.slice(0, take),
      count,
      hasNextPage: typeof rights[take] !== 'undefined',
    };
  }

  /** Create a single right. */
  @Mutation(() => Right, { nullable: true })
  @Policies(CREATE_RIGHT)
  async createRight(
    @Info() info: GraphQLResolveInfo,
    @Args() { data }: CreateOneRightArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RightArgs;

    const right = await this.rightAuthorizedService.create(
      { data, ...select },
      abilities,
    );

    return right;
  }

  /** Update a single right. */
  @Mutation(() => Right, { nullable: true })
  @Policies(UPDATE_RIGHT)
  async updateRight(
    @Info() info: GraphQLResolveInfo,
    @Args() { data, where }: UpdateOneRightArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RightArgs;

    const right = await this.rightAuthorizedService.update(
      { where, data, ...select },
      abilities,
    );

    return right;
  }

  /** Delete a single Right. */
  @Mutation(() => Right, { nullable: true })
  @Policies(DELETE_RIGHT)
  async deleteRight(
    @Info() info: GraphQLResolveInfo,
    @Args() { where }: DeleteOneRightArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    const select = new PrismaSelect(info).value as Prisma.RightArgs;

    const right = await this.rightAuthorizedService.delete(
      { where, ...select },
      abilities,
    );

    return right;
  }

  @ResolveField(() => Role)
  async roles(
    @Info() info: GraphQLResolveInfo,
    @Parent() right: Right,
    @Args() findManyArgs: FindManyRoleArgs,
    @CurrentAbilities()
    abilities: PureAbility<
      any,
      PrismaQuery<Record<string, any> & ForcedSubject<string>>
    >,
  ) {
    let { roles } = right;

    if (typeof roles === 'undefined') {
      const select = new PrismaSelect(info, {
        // defaultFields: this.nestjsGraphqlModuleConfig.defaultFields,
      }).valueOf(
        getPathFromGraphQLResolveInfo(info.path),
        'Role',
      ) as Prisma.RoleArgs;

      const where: Prisma.RoleWhereInput = {
        AND: [
          {
            rights: {
              some: {
                id: right.id,
              },
            },
          },
          findManyArgs.where || {},
        ],
      };

      roles = await this.roleAuthorizedService.findMany(
        {
          ...findManyArgs,
          where,
          ...select,
        },
        abilities,
      );
    }

    return roles;
  }
}
