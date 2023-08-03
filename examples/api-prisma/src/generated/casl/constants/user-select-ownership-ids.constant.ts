import { Prisma } from '@prisma/client';

export const UserSelectOwnershipIds =
  Prisma.validator<Prisma.UserDefaultArgs>()({
    select: {
      id: true,
      roles: true,
      profile: {
        select: {
          id: true,
          lastName: true,
          userId: true,
        },
      },
      tasks: {
        select: {
          id: true,
          authorId: true,
        },
      },
      sharedTasks: {
        select: {
          id: true,
          authorId: true,
        },
      },
    },
  });
