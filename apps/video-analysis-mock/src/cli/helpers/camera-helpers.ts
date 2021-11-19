import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchCameraExternalIds(): Promise<string[]> {
  return (
    await prisma.camera.findMany({
      select: { externalId: true },
    })
  ).map(({ externalId }) => externalId);
}
