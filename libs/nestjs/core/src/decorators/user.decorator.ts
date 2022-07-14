import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { getRequestFromContext } from '../helpers';

/**
 * Get the user from the request
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getRequestFromContext(context).user,
);
