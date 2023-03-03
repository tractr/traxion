import { PrismaClient } from '@prisma/client';

import { ManagedPrismaClientsService } from '../services';

export function getDefaultPrismaClient(
  managePrismaClientService: ManagedPrismaClientsService,
): PrismaClient {
  return managePrismaClientService.prismaClients.default;
}
