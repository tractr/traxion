import { PrismaScalarField } from './interfaces';

import { Field } from '@trxn/hapify-core';

export function convertDmmfPrimaryFieldToHapifyField(
  field: PrismaScalarField,
): Field {
  throw new Error('primary field is not supported yet');
}
