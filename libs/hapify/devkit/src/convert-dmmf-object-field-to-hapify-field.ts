import { PrismaObjectField } from './interfaces';

import { Field } from '@trxn/hapify-core';

export function convertDmmfObjectFieldToHapifyField(
  field: PrismaObjectField,
): Field {
  throw new Error('object field is not supported yet');
}
