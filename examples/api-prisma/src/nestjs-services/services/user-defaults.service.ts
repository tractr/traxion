import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@trxn/nestjs-database";

@Injectable()
export class UserDefaultService {
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
