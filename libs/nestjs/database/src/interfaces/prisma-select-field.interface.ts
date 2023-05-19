/**
 * Get the key of a Prisma select field if it is not true
 */
export type GetPrismaKeyIfNotSelected<
  T extends Record<string, unknown>,
  K extends keyof T,
> = T[K] extends true ? null : K;
