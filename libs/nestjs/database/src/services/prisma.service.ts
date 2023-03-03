import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * This service is used to inject the PrismaClient into the NestJS DI system.
 */
@Injectable()
export class PrismaService extends PrismaClient {}
