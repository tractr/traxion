import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import {
  CreateUserDto,
  ReadUserDto,
  SearchUserDto,
  UpdateUserDto,
} from '../dtos';
import { DatabaseService } from '../../core';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  public async findOne(
    where: Prisma.UserWhereUniqueInput,
    options?: Omit<Prisma.FindUniqueUserArgs, 'where'>
  ): Promise<User> {
    return this.db.user.findUnique({ where, ...options });
  }

  public async create(data: CreateUserDto): Promise<User> {
    return this.db.user.create({ data });
  }

  public async read(id: number, include: ReadUserDto): Promise<User> {
    return this.db.user.findUnique({
      where: { id },
      include,
    });
  }

  public async search(filters: SearchUserDto): Promise<User[]> {
    return this.db.user.findMany({
      where: {
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
      },
    });
  }

  public async count(filters: SearchUserDto): Promise<number> {
    return this.db.user.count({
      where: {
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
      },
    });
  }

  public async update(id: number, data: UpdateUserDto): Promise<User> {
    return this.db.user.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<User> {
    return this.db.user.delete({ where: { id } });
  }
}
