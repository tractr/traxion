import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *         Return default internal fields
     *         
     */
    getDefaultInternals() {
        return {
                createdAt: this.getDefaultCreatedAt(),
              };
    }

    /**
     *         Return default value for internal field 'createdAt'
     *         
     */
    getDefaultCreatedAt() {
        return new Date();
    }
}
