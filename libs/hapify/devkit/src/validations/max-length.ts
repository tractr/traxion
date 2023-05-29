export function validateMaxLengthMetadata(
  metadata: Record<string, unknown>,
): boolean {
  return (
    typeof metadata.maxLength !== 'string' || /^\d+$/.test(metadata.maxLength)
  );
}
