/**
 * Get the key of a Prisma select field if it is not true
 */
export type ExcludePrismaField<
  T extends Record<string, unknown> | null | undefined,
  K extends string,
> = K extends keyof T ? (T[K] extends true ? null : K) : K;
