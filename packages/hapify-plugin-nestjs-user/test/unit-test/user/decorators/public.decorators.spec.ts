import { IS_PUBLIC_KEY, Public } from '@tractr/hapify-plugin-nestjs-core';

describe('@Public decorator', () => {
  describe('IS_PUBLIC_KEY', () => {
    it('should be a string', () => {
      expect(typeof IS_PUBLIC_KEY).toBe('string');
    });
  });
  describe('Public', () => {
    it('should be a function', () => {
      expect(typeof Public).toBe('function');
    });
    it('should have property Key set', () => {
      const publicDecorator = Public();
      expect(publicDecorator.KEY).toEqual(IS_PUBLIC_KEY);
    });
  });
});
