import { Prisma } from '@prisma/client';

export const UserSelectOwnershipIds = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    tasks: {
      select: {
        id: true,
        authorId: true,
        author: {
          select: {
            id: true,
          },
        },
      },
    },
    sharedTasks: {
      select: {
        id: true,
        authorId: true,
        author: {
          select: {
            id: true,
          },
        },
      },
    },
  },
});
