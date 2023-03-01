import { PrismaClient } from '@prisma/client';

import { ManagePrismaClientsService } from '../services';

export function getDefaultPrismaClient(
  managePrismaClientService: ManagePrismaClientsService,
): PrismaClient {
  return managePrismaClientService.prismaClients.default;
}
