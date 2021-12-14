// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNullOrUndefined(value: any): value is null | undefined {
  return value === null || value === undefined;
}
