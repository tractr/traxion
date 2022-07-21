import { CaslUserRoles } from './role-permission.interface';

describe('RolePermissionInterface', () => {
  it('should define the default user roles', () => {
    expect(CaslUserRoles).toEqual({
      admin: 'admin',
      user: 'user',
      guest: 'guest',
    });
  });
});
