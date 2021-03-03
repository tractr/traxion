export function isDevelopment(): boolean {
  const { NODE_ENV } = process.env;

  return NODE_ENV === 'development';
}
