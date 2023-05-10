import { Prisma } from "@prisma/client";

export type DefaultOwnershipSelect = {
          User: { [key in keyof Prisma.UserSelect]: boolean },
    Profile: { [key in keyof Prisma.ProfileSelect]: boolean },
    Role: { [key in keyof Prisma.RoleSelect]: boolean },
    Right: { [key in keyof Prisma.RightSelect]: boolean },
      };
