import { Prisma } from '@prisma/client';

import { UserSelectOwnershipIds } from '../constants';

/** Get the select configuration for the prisma user query to be able to construct the user with the correct ids */
export function getSelectPrismaUserQuery(): Prisma.UserSelect {
  return UserSelectOwnershipIds.select;
}
