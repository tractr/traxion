import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * This service is used to inject the PrismaClient into the NestJS DI system.
 *
 * @deprecated Use PrismaService instead.
 */
@Injectable()
export class DatabaseService extends PrismaClient {}
