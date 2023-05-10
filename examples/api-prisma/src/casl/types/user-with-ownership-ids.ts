import { Prisma } from "@prisma/client";
import { UserSelectOwnershipIds } from "../constants";

/** User export type that the userService.findUnique method will return by the getSelectPrismaUserQuery function */
export type UserWithOwnershipIds = Prisma.UserGetPayload<
        typeof UserSelectOwnershipIds
      >;;
