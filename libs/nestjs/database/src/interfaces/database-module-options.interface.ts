import { PrismaClientOptions } from '../services/database.service';

export interface DatabaseModuleOptions {
  exposeSchema: boolean;

  prismaClientOptions?: PrismaClientOptions;
}
