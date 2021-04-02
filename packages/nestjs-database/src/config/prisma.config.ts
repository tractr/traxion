import { PrismaClientOptions } from '@prisma/client/runtime';

export const PRISMA_OPTIONS: PrismaClientOptions = {
  rejectOnNotFound: true,

  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
};
