import { Prisma } from '@prisma/client';

export type OwnerShipSelect = {
  User: Prisma.UserSelect;
  Role: Prisma.RoleSelect;
  Right: Prisma.RightSelect;
};
