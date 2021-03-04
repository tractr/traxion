import { Prisma, User } from '@prisma/client';
export declare class UserFindManyQueryDto {
    name?: string;
    email?: string;
    role?: string;
    banned?: boolean;
    sort: keyof User;
    order: Prisma.SortOrder;
    take: number;
    skip: number;
}
