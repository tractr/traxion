import { Model, ModelAction } from '../../../nodes';
import { ModelActionScope } from '../../interfaces';

export function isModelActionPublic<T extends Model, A extends ModelAction>(
  action: A,
): (model: T) => model is T & ModelActionScope<A, 'public'> {
  return (model: T): model is T & ModelActionScope<A, 'public'> =>
    model.actionsScopes[action] === 'public';
}

export function isModelActionAuth<T extends Model, A extends ModelAction>(
  action: A,
): (model: T) => model is T & ModelActionScope<A, 'auth'> {
  return (model: T): model is T & ModelActionScope<A, 'auth'> =>
    model.actionsScopes[action] === 'auth';
}

export function isModelActionSystem<T extends Model, A extends ModelAction>(
  action: A,
): (model: T) => model is T & ModelActionScope<A, 'system'> {
  return (model: T): model is T & ModelActionScope<A, 'system'> =>
    model.actionsScopes[action] === 'system';
}
