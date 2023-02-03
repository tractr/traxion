import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable
export class RoleService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }
}
