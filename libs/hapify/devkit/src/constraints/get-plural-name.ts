export function getPluralName(
  metadata: Record<string, unknown> = {},
): string | undefined {
  return typeof metadata.pluralName === 'string'
    ? metadata.pluralName
    : undefined;
}
