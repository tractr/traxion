import {
  ROLES_KEY,
  Roles,
} from '../../../../src/authentication/decorators/roles.decorator';

describe('@Roles decorator', () => {
  describe('ROLES_KEY', () => {
    it('should be a string', () => {
      expect(typeof ROLES_KEY).toBe('string');
    });
  });
  describe('Public', () => {
    it('should be a function', () => {
      expect(typeof Roles).toBe('function');
    });
    it('should have property Key set', () => {
      const rolesDecorator = Roles();
      expect(rolesDecorator.KEY).toEqual(ROLES_KEY);
    });
  });
});
