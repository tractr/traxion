import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { getRequestFromContext } from '@trxn/nestjs-core';

/**
 * Get the user from the request
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    console.warn(
      '@CurrentUser is deprecated, use @CurrentUser from @trxn/nestjs-core instead',
    );
    return getRequestFromContext(context).user;
  },
);
