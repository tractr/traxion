import { Prisma } from '@prisma/client';

export const UserSelectOwnershipIds = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    role: {
      select: { id: true, rights: { select: { id: true } } },
    },
  },
});
