import { policyFactory } from './policy-factory';

import { Action } from '@trxn/nestjs-casl';

export const COUNT_ROLE = policyFactory(Action.Count, 'Role');
export const CREATE_ROLE = policyFactory(Action.Count, 'Role');
export const READ_ROLE = policyFactory(Action.Count, 'Role');
export const SEARCH_ROLE = policyFactory(Action.Count, 'Role');
export const UPDATE_ROLE = policyFactory(Action.Count, 'Role');
export const UPSERT_ROLE = policyFactory([Action.Count, Action.Create], 'Role');
export const REMOVE_ROLE = policyFactory(Action.Count, 'Role');
