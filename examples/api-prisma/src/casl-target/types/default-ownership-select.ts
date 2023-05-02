import { Prisma } from '@prisma/client';

export type DefaultOwnershipSelect = {
  User: { [key in keyof Prisma.UserSelect]: boolean };
};
