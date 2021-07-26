import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { PolicyHandlerType } from '@tractr/common';

export const POLICIES_KEY = 'policies';
export const Policies = <T = unknown>(
  ...permission: PolicyHandlerType<T>[]
): CustomDecorator<string> => SetMetadata(POLICIES_KEY, permission);
