import { Prisma, User } from '@prisma/client';
import { UserDatabaseService } from './user-database.service';
export declare class UserService {
    protected readonly userDatabaseService: UserDatabaseService;
    constructor(userDatabaseService: UserDatabaseService);
    create(params: Prisma.UserCreateArgs): Promise<User>;
    findUnique(params: Prisma.UserFindUniqueArgs): Promise<User | null>;
    findMany(params: Prisma.UserFindManyArgs): Promise<User[]>;
    count(params: Prisma.UserCountArgs): Promise<number>;
    update(params: Prisma.UserUpdateArgs): Promise<User>;
    upsert(params: Prisma.UserUpsertArgs): Promise<User>;
    delete(params: Prisma.UserDeleteArgs): Promise<User>;
}
