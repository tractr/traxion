export function isProduction(): boolean {
  const { NODE_ENV } = process.env;

  return NODE_ENV === 'production';
}
