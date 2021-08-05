/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '../interfaces';

export type PolicyHandlerCallback<AppAbility> = (
  ability: AppAbility,
  obj?: any,
) => boolean;

export interface PolicyHandler<AppAbility> {
  handle: PolicyHandlerCallback<AppAbility>;
}

export type PolicyHandlerType<AppAbility> =
  | Type<PolicyHandler<AppAbility>>
  | PolicyHandler<AppAbility>
  | PolicyHandlerCallback<AppAbility>;
