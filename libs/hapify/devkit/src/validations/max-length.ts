export function validateMaxLengthMetadata(
  metadata: Record<string, string>,
): boolean {
  return !metadata.maxLength || /^\d+$/.test(metadata.maxLength);
}
