export function transformUserMetadata(
  metadata: Record<string, unknown>,
): Record<string, unknown> {
  const { user, ...otherMetadata } = metadata;
  if (typeof user === 'undefined') return otherMetadata;

  return {
    ...otherMetadata,
    user: typeof user === 'boolean' ? user : user === 'true',
  };
}
