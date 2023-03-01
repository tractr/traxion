import { PrismaClient } from '@prisma/client';

import { ManagePrismaClientService } from '../services';

export function getDefaultPrismaClient(
  managePrismaClientService: ManagePrismaClientService,
): PrismaClient {
  return managePrismaClientService.prismaClients.default;
}
