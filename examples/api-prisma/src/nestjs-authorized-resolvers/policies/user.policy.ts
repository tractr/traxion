import { Action, policyFactory } from "@trxn/nestjs-casl";

export const COUNT_USER = policyFactory(Action.Count, 'User');
export const CREATE_USER = policyFactory(Action.Create, 'User');
export const READ_USER = policyFactory(Action.Read, 'User');
export const SEARCH_USER = policyFactory(Action.Search, 'User');
export const UPDATE_USER = policyFactory(Action.Update, 'User');
export const UPSERT_USER = policyFactory([Action.Create, Action.Update], 'User');
export const DELETE_USER = policyFactory(Action.Delete, 'User');
