/**
 * Possible values for actions' scope:
 *  - system (Denotes if the scope is restricted to the system, no user can access this)
 *  - auth (Denotes if the scope is restricted to authenticated users only)
 *  - public (Denotes if the scope is not restricted)
 */
export type Scope = 'system' | 'auth' | 'public';

/** Define the scope for each available action in a model */
export interface ModelActionsScopes {
  create: Scope;
  read: Scope;
  update: Scope;
  remove: Scope;
  search: Scope;
  count: Scope;
}

/**
 * Possible actions for a model
 */
export type ModelAction = keyof ModelActionsScopes;

/**
 * Define the scope for each available action in a field.
 * Undefined means that there is no particular restriction. We should rely on the model's scope.
 */
export interface FieldActionsScopes {
  read?: Scope;
  write?: Scope;
}

/**
 * Possible actions available for a field
 */
export type FieldAction = keyof FieldActionsScopes;
