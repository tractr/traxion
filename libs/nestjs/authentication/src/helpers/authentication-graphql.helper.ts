import { parse } from 'cookie';
import { signedCookies } from 'cookie-parser';

export type GraphqlSubscriptionContext = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra: any;
};

export type GraphqlContext = Partial<GraphqlSubscriptionContext>;
/*
 * Notes:

 * Those helpers must be used when using graphql subscriptions with the
 * graphql-ws library to provide authentication features.
 * 
 * As cookie-parser middleware is not applied to web-socket request, the 
 * cookies must be parsed manually in the 'onConnect' callback of the 
 * graphql-ws configuration.
 * 
 * Moreover, the request object is not propagated to nestjs by default for
 * web sockets. It must be done by using the 'context' callback of the nestjs
 * GraphqlModule.
 * 
 * For more information, refer to the next documentations:
 * 
 * https://docs.nestjs.com/graphql/subscriptions#authentication-over-websocket
 * https://github.com/enisdenjo/graphql-ws
 * https://github.com/enisdenjo/graphql-ws/discussions/257
 */

/**
 * Parse authentication cookies in the context of a
 * graphql subscription with web sockets (compatible with graphql-ws)
 *
 * @param secret - Secret to parse signed cookies
 * @returns a function that will parse cookies with the provided secret
 */
export function graphqlSubscriptionCookieParser(secret: string) {
  return function graphqlSubscriptionParseCookie({
    extra,
  }: GraphqlSubscriptionContext) {
    const cookieHeader: string = extra.request?.headers?.cookie;

    // If a cookie is present, it is parsed and added to the request object
    if (cookieHeader) {
      const cookies = parse(cookieHeader);
      // eslint-disable-next-line no-param-reassign
      extra.request.signedCookies = signedCookies(cookies, secret);
    }
  };
}

/**
 * Propagate graphql context to the nestjs context for web socket
 * subscriptions.
 * This is useful when using guards that expect a request object to be
 * available in the nestjs context (which is not present by default for
 * web socket subscriptions).
 *
 * @param context - The graphql context
 * @returns the request object that will be added to the nestjs context object
 */
export function graphqlPropagateSubscriptionContext({ extra }: GraphqlContext) {
  // The extra object is injected by graphql-ws and only present for
  // web socket subscriptions so it is used as a discriminator to know
  // if the request is a subscription.
  // The returned object will be merged in the nestjs context.
  return extra
    ? {
        req: extra.request,
      }
    : {};
}
