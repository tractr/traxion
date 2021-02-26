import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@tractr/hapify-plugin-nestjs-database';

@Injectable()
export class UserDatabaseService {
  constructor(protected readonly databaseService: DatabaseService) {}

  public findUnique(
    params: Prisma.UserFindUniqueArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['findUnique']
  > {
    return this.databaseService.user.findUnique(params);
  }

  public findFirst(
    params: Prisma.UserFindFirstArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['findFirst']
  > {
    return this.databaseService.user.findFirst(params);
  }

  public findMany(
    params: Prisma.UserFindManyArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['findMany']
  > {
    return this.databaseService.user.findMany(params);
  }

  public create(
    params: Prisma.UserCreateArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['create']
  > {
    return this.databaseService.user.create(params);
  }

  public update(
    params: Prisma.UserUpdateArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['update']
  > {
    return this.databaseService.user.update(params);
  }

  public updateMany(
    params: Prisma.UserUpdateManyArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['updateMany']
  > {
    return this.databaseService.user.updateMany(params);
  }

  public upsert(
    params: Prisma.UserUpsertArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['upsert']
  > {
    return this.databaseService.user.upsert(params);
  }

  public delete(
    params: Prisma.UserDeleteArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['delete']
  > {
    return this.databaseService.user.delete(params);
  }

  public deleteMany(
    params: Prisma.UserDeleteManyArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['deleteMany']
  > {
    return this.databaseService.user.deleteMany(params);
  }

  public count(
    params: Prisma.UserCountArgs,
  ): ReturnType<
    Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['count']
  > {
    return this.databaseService.user.count(params);
  }

  public aggregate(
    params: Prisma.UserAggregateArgs,
  ): ReturnType<
    Prisma.UserDelegate<
      Prisma.PrismaClientOptions['rejectOnNotFound']
    >['aggregate']
  > {
    return this.databaseService.user.aggregate(params);
  }
}
