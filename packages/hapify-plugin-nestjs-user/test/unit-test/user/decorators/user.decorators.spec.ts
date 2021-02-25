import {
  CurrentGqlUser,
  CurrentUser,
} from '../../../../src/authentication/decorators/user.decorator';
import { getParamDecoratorFactory } from '../../../helpers/get-param-decorator-factory';

describe('@User param', () => {
  describe('User', () => {
    it('should be a function', () => {
      expect(typeof CurrentUser).toBe('function');
    });

    it('should inject the current request user', () => {
      const factory = getParamDecoratorFactory(CurrentUser);
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
      expect(typeof CurrentGqlUser).toBe('function');
    });
  });
});
