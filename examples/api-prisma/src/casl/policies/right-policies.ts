import { policyFactory } from './policy-factory';

import { Action } from '@trxn/nestjs-casl';

export const COUNT_RIGHT = policyFactory(Action.Count, 'Right');
export const CREATE_RIGHT = policyFactory(Action.Count, 'Right');
export const READ_RIGHT = policyFactory(Action.Count, 'Right');
export const SEARCH_RIGHT = policyFactory(Action.Count, 'Right');
export const UPDATE_RIGHT = policyFactory(Action.Count, 'Right');
export const UPSERT_RIGHT = policyFactory(
  [Action.Count, Action.Create],
  'Right',
);
export const REMOVE_RIGHT = policyFactory(Action.Count, 'Right');
