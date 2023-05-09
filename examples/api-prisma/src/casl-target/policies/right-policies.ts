import { policyFactory } from './policy-factory';

import { Action } from '@trxn/nestjs-casl';

export const COUNT_RIGHT = policyFactory(Action.Count, 'Right');
export const CREATE_RIGHT = policyFactory(Action.Create, 'Right');
export const READ_RIGHT = policyFactory(Action.Read, 'Right');
export const SEARCH_RIGHT = policyFactory(Action.Search, 'Right');
export const UPDATE_RIGHT = policyFactory(Action.Update, 'Right');
export const UPSERT_RIGHT = policyFactory(
  [Action.Create, Action.Update],
  'Right',
);
export const DELETE_RIGHT = policyFactory(Action.Delete, 'Right');
