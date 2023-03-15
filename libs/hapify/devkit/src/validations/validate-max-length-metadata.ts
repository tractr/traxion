export function validateMaxLengthMetadata(
  metadata: Record<string, unknown>,
): true | never {
  if (typeof metadata.maxLength === 'undefined') return true;

  const valid =
    typeof metadata.maxLength === 'string'
      ? /^\d+$/.test(metadata.maxLength)
      : typeof metadata.maxLength === 'number';

  if (!valid) {
    throw new Error('Invalid maxLength metadata');
  }

  return true;
}
