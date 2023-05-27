export function compressWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}
