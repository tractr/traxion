import { policyFactory } from './policy-factory';

import { Action } from '@trxn/nestjs-casl';

export const COUNT_USER = policyFactory(Action.Count, 'User');
export const CREATE_USER = policyFactory(Action.Count, 'User');
export const READ_USER = policyFactory(Action.Count, 'User');
export const SEARCH_USER = policyFactory(Action.Count, 'User');
export const UPDATE_USER = policyFactory(Action.Count, 'User');
export const UPSERT_USER = policyFactory([Action.Count, Action.Create], 'User');
export const REMOVE_USER = policyFactory(Action.Count, 'User');
