export function ensureRequestInContext<T extends { req?: unknown }>(
  context: T,
): Exclude<T['req'], null | undefined> {
  if (context && typeof context === 'object' && 'req' in context) {
    return context.req as Exclude<T['req'], null | undefined>;
  }

  throw new Error(
    'No request object found in your graphql context. In your graphql server configuration, make sure to set context: ({ req, res }) => ({ req, res })',
  );
}

export function ensureResponseInContext<T extends { res?: unknown }>(
  context: T,
): Exclude<T['res'], null | undefined> {
  if (context && typeof context === 'object' && 'res' in context) {
    return context.res as Exclude<T['res'], null | undefined>;
  }

  throw new Error(
    'No request object found in your graphql context. In your graphql server configuration, make sure to set context: ({ req, res }) => ({ req, res })',
  );
}
