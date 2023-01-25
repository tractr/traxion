import { Field, FieldAction } from '../../../nodes';
import { FieldActionScope } from '../../interfaces';

export function isFieldActionPublic<T extends Field, A extends FieldAction>(
  action: A,
): (field: T) => field is T & FieldActionScope<A, 'public'> {
  return (field: T): field is T & FieldActionScope<A, 'public'> =>
    field.actionsScopes[action] === 'public';
}

export function isFieldActionAuth<T extends Field, A extends FieldAction>(
  action: A,
): (field: T) => field is T & FieldActionScope<A, 'auth'> {
  return (field: T): field is T & FieldActionScope<A, 'auth'> =>
    field.actionsScopes[action] === 'auth';
}

export function isFieldActionSystem<T extends Field, A extends FieldAction>(
  action: A,
): (field: T) => field is T & FieldActionScope<A, 'system'> {
  return (field: T): field is T & FieldActionScope<A, 'system'> =>
    field.actionsScopes[action] === 'system';
}

export function isFieldActionEmpty<T extends Field, A extends FieldAction>(
  action: A,
): (field: T) => field is T & FieldActionScope<A, undefined> {
  return (field: T): field is T & FieldActionScope<A, undefined> =>
    !field.actionsScopes[action];
}
