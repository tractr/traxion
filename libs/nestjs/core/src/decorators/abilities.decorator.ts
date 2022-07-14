import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { getRequestFromContext } from '../helpers';

/**
 * Get the abilities from the request
 */
export const CurrentAbilities = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getRequestFromContext(context).abilities,
);
