import { Prisma } from '@prisma/client';

export type DefaultOwnershipSelect = {
  User: { [key in keyof Prisma.UserSelect]: boolean };
  Profile: { [key in keyof Prisma.ProfileSelect]: boolean };
  Task: { [key in keyof Prisma.TaskSelect]: boolean };
};
