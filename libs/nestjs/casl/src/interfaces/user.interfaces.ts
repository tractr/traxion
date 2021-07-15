export const CaslUserRoles: {
  admin: 'admin';
  user: 'user';
  guest: 'guest';
} = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
};

export type CaslUserRoles = typeof CaslUserRoles[keyof typeof CaslUserRoles];

export interface CaslUser {
  roles: CaslUserRoles[];
}
