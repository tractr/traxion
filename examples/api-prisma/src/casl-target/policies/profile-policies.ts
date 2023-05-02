import { policyFactory } from './policy-factory';

import { Action } from '@trxn/nestjs-casl';

export const COUNT_PROFILE = policyFactory(Action.Count, 'Profile');
export const CREATE_PROFILE = policyFactory(Action.Create, 'Profile');
export const READ_PROFILE = policyFactory(Action.Read, 'Profile');
export const SEARCH_PROFILE = policyFactory(Action.Search, 'Profile');
export const UPDATE_PROFILE = policyFactory(Action.Update, 'Profile');
export const UPSERT_PROFILE = policyFactory(
  [Action.Create, Action.Update],
  'Profile',
);
export const DELETE_PROFILE = policyFactory(Action.Delete, 'Profile');
