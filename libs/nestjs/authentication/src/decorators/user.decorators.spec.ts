import { GqlUser, User } from './user.decorator';

import { getParamDecoratorFactory } from '@tractr/nestjs-testing';

describe('@User param', () => {
  describe('User', () => {
    it('should be a function', () => {
      expect(typeof User).toBe('function');
    });

    it('should inject the current request user', () => {
      const factory = getParamDecoratorFactory(User);
      const mockUser = { id: 'test' };
      const getRequest = jest.fn(() => ({
        user: mockUser,
      }));
      const ctx = {
        switchToHttp: jest.fn(() => ({
          getRequest,
        })),
      };
      const result = factory(null, ctx);

      expect(result).toBe(mockUser);
      expect(ctx.switchToHttp).toBeCalledTimes(1);
      expect(getRequest).toBeCalledTimes(1);
    });
  });

  describe('@GqlUser param', () => {
    it('should be a function', () => {
      expect(typeof GqlUser).toBe('function');
    });
  });
});
