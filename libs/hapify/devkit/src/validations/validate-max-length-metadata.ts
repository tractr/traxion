export function validateMaxLengthMetadata(
  metadata: Record<string, unknown>,
): true | never {
  console.log('here', metadata);
  const valid =
    typeof metadata.maxLength === 'undefined' ||
    typeof metadata.maxLength === 'string'
      ? /^\d+$/.test(metadata.maxLength as string)
      : typeof metadata.maxLength === 'number';

  if (!valid) {
    throw new Error('Invalid maxLength metadata');
  }

  return true;
}
