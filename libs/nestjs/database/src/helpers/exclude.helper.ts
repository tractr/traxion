/**
 * Exclude Prisma field by selecting the fields with an array
 *
 * @param data
 * @param keys
 * @returns
 */
export function excludePrismaField<
  T extends Record<string, unknown>,
  Key extends keyof T | null | undefined,
>(data: T, keys: Key[]): { [K in Exclude<keyof T, Key>]: T[K] } {
  const filteredKeys = keys.filter((key): key is Key => !!key);
  return {
    ...Object.keys(data).reduce((acc, key) => {
      if (filteredKeys.includes(key as Key)) return acc;
      return {
        ...acc,
        [key]: data[key],
      };
    }, {} as T),
  };
}
