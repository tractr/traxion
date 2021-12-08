import { Abilities, GqlAbilities } from './abilities.decorator';

import { getParamDecoratorFactory } from '@tractr/nestjs-testing';

describe('@Abilities param', () => {
  describe('Abilities', () => {
    it('should be a function', () => {
      expect(typeof Abilities).toBe('function');
    });

    it('should inject the current request abilities', () => {
      const factory = getParamDecoratorFactory(Abilities);
      const mockAbilities = { can: () => true };
      const getRequest = jest.fn(() => ({
        abilities: mockAbilities,
      }));
      const ctx = {
        switchToHttp: jest.fn(() => ({
          getRequest,
        })),
      };
      const result = factory(null, ctx);

      expect(result).toBe(mockAbilities);
      expect(ctx.switchToHttp).toBeCalledTimes(1);
      expect(getRequest).toBeCalledTimes(1);
    });
  });

  describe('@GqlUser param', () => {
    it('should be a function', () => {
      expect(typeof GqlAbilities).toBe('function');
    });
  });
});
