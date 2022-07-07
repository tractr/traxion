export function formatPopulate<T extends Record<string, unknown>>(
  populate: (keyof T)[] | keyof T,
): Record<keyof T, boolean> {
  return (Array.isArray(populate) ? populate : [populate]).reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    {} as Record<keyof T, boolean>,
  );
}
