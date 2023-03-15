export function transformUserMetadata(
  metadata: Record<string, unknown>,
): Record<string, unknown> {
  return {
    ...metadata,
    user:
      typeof metadata.user === 'boolean'
        ? metadata.user
        : metadata.user === 'true',
  };
}
