export function trim(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  const raw = String.raw(strings, ...values);

  // Get the minimum indentation of non-empty lines (except the first line)
  let minIndentation = Infinity;
  raw.split('\n').forEach((line, index) => {
    if (index === 0) {
      return;
    }
    const indentation = line.match(/^ +/);
    if (indentation && indentation[0].length < minIndentation) {
      minIndentation = indentation[0].length;
    }
  });

  // Remove the minimum indentation from all lines
  return raw
    .split('\n')
    .map((line, index) => {
      if (index === 0) {
        return line;
      }
      if (line.trim() === '') {
        return '';
      }
      return line.slice(minIndentation);
    })
    .map((line) => line.trimEnd())
    .join('\n');
}

export function indent(
  indentNumber: number,
): (strings: TemplateStringsArray, ...values: unknown[]) => string;
export function indent(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string;
export function indent(
  strings: TemplateStringsArray | number,
  ...values: unknown[]
): string | ((strings: TemplateStringsArray, ...values: unknown[]) => string) {
  const indentNumber = typeof strings === 'number' ? strings : 0;

  function identString(str: string) {
    return ' '.repeat(indentNumber) + str;
  }

  if (typeof strings === 'number') {
    return (str: TemplateStringsArray, ...val: unknown[]) =>
      trim(str, ...val)
        .split('\n')
        .map(identString)
        .join('\n');
  }

  return trim(strings, ...values)
    .split('\n')
    .map(identString)
    .join('\n');
}
