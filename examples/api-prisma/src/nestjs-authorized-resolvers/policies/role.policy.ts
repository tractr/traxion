import { Action, policyFactory } from '@trxn/nestjs-casl';

export const COUNT_ROLE = policyFactory(Action.Count, 'Role');
export const CREATE_ROLE = policyFactory(Action.Create, 'Role');
export const READ_ROLE = policyFactory(Action.Read, 'Role');
export const SEARCH_ROLE = policyFactory(Action.Search, 'Role');
export const UPDATE_ROLE = policyFactory(Action.Update, 'Role');
export const UPSERT_ROLE = policyFactory(
  [Action.Create, Action.Update],
  'Role',
);
export const DELETE_ROLE = policyFactory(Action.Delete, 'Role');
