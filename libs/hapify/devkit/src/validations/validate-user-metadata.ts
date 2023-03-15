export function validateUserMetadata(
  metadata: Record<string, unknown>,
): true | never {
  if (typeof metadata.user === 'undefined') return true;

  const valid =
    typeof metadata.user === 'boolean'
      ? true
      : metadata.user === 'true' || metadata.user === 'false';

  if (!valid) {
    throw new Error('Invalid user metadata');
  }

  return true;
}
