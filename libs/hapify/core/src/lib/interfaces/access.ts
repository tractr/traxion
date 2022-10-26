// ==================================================================
//  Access
// ==================================================================
/**
 * Possible values for actions' access:
 *  - admin (Denotes if the access is restricted to the admins)
 *  - owner (Denotes if the access is restricted to the owner of the resource)
 *  - authenticated (Denotes if the access is restricted to authenticated users)
 *  - guest (Denotes if the access is not restricted)
 */
export type Role = 'admin' | 'owner' | 'auth' | 'guest';

/** Define the access for each available action in a model */
export interface ModelAccesses {
  create: Role;
  read: Role;
  update: Role;
  remove: Role;
  search: Role;
  count: Role;
}

/** Define the access for each available action in a field */
export interface FieldAccesses {
  read?: Role;
  write?: Role;
}
