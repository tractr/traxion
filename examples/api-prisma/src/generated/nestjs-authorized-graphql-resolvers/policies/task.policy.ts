import { Action, policyFactory } from '@trxn/nestjs-casl';

export const COUNT_TASK = policyFactory(Action.Count, 'Task');
export const CREATE_TASK = policyFactory(Action.Create, 'Task');
export const READ_TASK = policyFactory(Action.Read, 'Task');
export const SEARCH_TASK = policyFactory(Action.Search, 'Task');
export const UPDATE_TASK = policyFactory(Action.Update, 'Task');
export const UPSERT_TASK = policyFactory(
  [Action.Create, Action.Update],
  'Task',
);
export const DELETE_TASK = policyFactory(Action.Delete, 'Task');
