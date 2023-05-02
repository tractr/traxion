import { Prisma } from '@prisma/client';

export type DefaultOwnershipSelect = {
  User: { [key in keyof Prisma.UserSelect]: boolean };
  Role: { [key in keyof Prisma.RoleSelect]: boolean };
  Right: { [key in keyof Prisma.RightSelect]: boolean };
};
