import { Query, Resolver } from '@nestjs/graphql';

import { User } from '../../nestjs-graphql-dtos';

import { PrismaService } from '@trxn/nestjs-database';

@Resolver(() => User)
export class CustomResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [User])
  customQuery() {
    return this.prisma.user.findMany();
  }
}
