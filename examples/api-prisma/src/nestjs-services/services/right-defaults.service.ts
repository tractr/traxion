import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@trxn/nestjs-database";

@Injectable()
export class RightDefaultService {
    /**
     *         Return default internal fields
     *         
     */
    getDefaultInternals() {
        return {};
    }
}
