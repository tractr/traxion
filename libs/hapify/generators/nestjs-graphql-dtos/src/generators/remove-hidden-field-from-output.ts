import { camel } from 'case';
import { ClassDeclaration } from 'ts-morph';

import { Field } from '@trxn/hapify-core';

export function removeHiddenFieldFromOutput(
  classDeclaration: ClassDeclaration,
  hiddenFields: Field[],
) {
  hiddenFields.forEach((hiddenField) => {
    classDeclaration.getProperty(camel(hiddenField.name))?.remove();
  });
}
