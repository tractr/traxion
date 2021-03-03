import { Prisma } from '@prisma/client';
import { DatabaseService } from '@tractr/hapify-plugin-nestjs-database';
export declare class UserDatabaseService {
    protected readonly databaseService: DatabaseService;
    constructor(databaseService: DatabaseService);
    findUnique(params: Prisma.UserFindUniqueArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['findUnique']>;
    findFirst(params: Prisma.UserFindFirstArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['findFirst']>;
    findMany(params: Prisma.UserFindManyArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['findMany']>;
    create(params: Prisma.UserCreateArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['create']>;
    update(params: Prisma.UserUpdateArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['update']>;
    updateMany(params: Prisma.UserUpdateManyArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['updateMany']>;
    upsert(params: Prisma.UserUpsertArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['upsert']>;
    delete(params: Prisma.UserDeleteArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['delete']>;
    deleteMany(params: Prisma.UserDeleteManyArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['deleteMany']>;
    count(params: Prisma.UserCountArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['count']>;
    aggregate(params: Prisma.UserAggregateArgs): ReturnType<Prisma.UserDelegate<Prisma.PrismaClientOptions['rejectOnNotFound']>['aggregate']>;
}
