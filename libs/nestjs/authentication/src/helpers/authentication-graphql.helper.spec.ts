import {
  graphqlPropagateSubscriptionContext,
  GraphqlSubscriptionContext,
  graphqlSubscriptionCookieParser,
} from './authentication-graphql.helper';

describe('Authentication graphql helpers', () => {
  describe('graphqlSubscriptionCookieParser', () => {
    it('should add unsigned cookie to the context if a cookie is provided', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockedContext: any = {
        extra: {
          request: {
            headers: {
              cookie:
                'authCookie=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhN2FjYzVkMy0yMTE3LTRmMTAtODAyOS00MWFjMTc3NDhmMTEiLCJpYXQiOjE2NDMzMTI4NjZ9.z5jc15YkbOlxpbpxxK3o_yX5D47RJ12Z21ArmW6BT8k.mouwKOd7fIYa7dqUaobCdQjoztegED%2B5Vn3DqbbeJ%2FQ',
            },
          },
        },
      };

      const expectedParsedCookie = {
        authCookie:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhN2FjYzVkMy0yMTE3LTRmMTAtODAyOS00MWFjMTc3NDhmMTEiLCJpYXQiOjE2NDMzMTI4NjZ9.z5jc15YkbOlxpbpxxK3o_yX5D47RJ12Z21ArmW6BT8k',
      };

      graphqlSubscriptionCookieParser('secret')(
        mockedContext as GraphqlSubscriptionContext,
      );

      expect(mockedContext.extra.request.signedCookies).toEqual(
        expectedParsedCookie,
      );
    });

    it('should do nothing if there is no cookie', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockedContext: any = {
        extra: {
          request: {
            headers: {},
          },
        },
      };

      graphqlSubscriptionCookieParser('secret')(
        mockedContext as GraphqlSubscriptionContext,
      );

      expect(mockedContext.extra.request.signedCookies).toBeUndefined();
    });
  });

  describe('graphqlPropagateSubscriptionContext', () => {
    it('should return request in web socket context', () => {
      const request = { request: 'request' };
      const context = { extra: { request } };

      const result = graphqlPropagateSubscriptionContext(context);

      expect(result).toEqual({ req: request });
    });

    it('should return an empty object in non web socket context', () => {
      const context = { extra: undefined };

      const result = graphqlPropagateSubscriptionContext(context);

      expect(result).toEqual({});
    });
  });
});
