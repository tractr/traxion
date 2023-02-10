import { PrismaClient } from "@prisma/client";

/** The public interface of the ModelsServicesOptions. */
export interface ModelsServicesOptions {
    /** Dynamic database module to use. */
    prismaClient?: PrismaClient;
}
