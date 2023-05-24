import { Prisma } from '@prisma/client';

export const UserSelectOwnershipIds = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    roles: true,
    profile: {
      select: {
        id: true,
        lastName: true,
        userId: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    },
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
