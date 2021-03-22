import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Prisma from '@prisma/client';

@Injectable()
export class DatabaseService
  extends Prisma.PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({ rejectOnNotFound: true });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
