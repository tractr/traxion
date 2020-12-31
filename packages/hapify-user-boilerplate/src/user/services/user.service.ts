import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserReadManyDto } from '../dtos';
import { DatabaseService } from '../../core';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  public async create(
    data: Prisma.UserCreateInput,
    options?: Omit<Prisma.UserCreateArgs, 'data'>
  ): Promise<User> {
    return this.db.user.create({ data, ...options });
  }

  public async readOne(
    where: Prisma.UserWhereUniqueInput,
    options?: Omit<Prisma.FindUniqueUserArgs, 'where'>
  ): Promise<User> {
    return this.db.user.findUnique({ where, ...options });
  }

  public async readMany(
    where: Prisma.UserWhereInput,
    options?: Omit<Prisma.FindManyUserArgs, 'where'>
  ): Promise<User[]> {
    return this.db.user.findMany({ where, ...options });
  }

  public async count(
    where: Prisma.UserWhereInput,
    options?: Omit<Prisma.FindManyUserArgs, 'where'>
  ): Promise<number> {
    return this.db.user.count({ where, ...options });
  }

  public async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
    options?: Omit<Prisma.UserUpdateArgs, 'where' | 'data'>
  ): Promise<User> {
    return this.db.user.update({ where, data, ...options });
  }

  public async delete(
    where: Prisma.UserWhereUniqueInput,
    options?: Omit<Prisma.FindUniqueUserArgs, 'where'>
  ): Promise<User> {
    return this.db.user.delete({ where, ...options });
  }

  public searchDtoToSearchParams(
    filters: UserReadManyDto
  ): Prisma.UserWhereInput {
    return {
      id: {
        equals: filters.id,
      },
      name: {
        contains: filters.name,
      },
      email: {
        contains: filters.email,
      },
      role: {
        contains: filters.role,
      },
      banned: {
        equals: filters.banned,
      },
    };
  }
}
