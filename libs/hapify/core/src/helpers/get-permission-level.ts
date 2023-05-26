import { Model } from '../models';

export type PermissionLevel =
  | 'internal'
  | 'readOnly'
  | 'write'
  | 'allowDelete'
  | 'default'
  | 'unknown';

export function getPermissionLevel(model: Model): PermissionLevel {
  const permission = model.metadata?.permission;

  if (permission === 'internal') return 'internal';
  if (permission === 'readOnly') return 'readOnly';
  if (permission === 'write') return 'write';
  if (permission === 'allowDelete') return 'allowDelete';
  if (typeof permission !== 'undefined' && permission !== '') return 'unknown';

  return 'default';
}
