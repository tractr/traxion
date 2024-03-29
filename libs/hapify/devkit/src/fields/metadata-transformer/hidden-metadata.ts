import { FieldDeclaration } from '@trxn/hapify-core';

export function hiddenMetadata(field: FieldDeclaration): FieldDeclaration {
  const { hidden, ...metadata } = field.metadata || {};

  if ((typeof hidden === 'boolean' && hidden) || hidden === 'true') {
    return {
      ...field,
      isHidden: true,
      metadata,
    };
  }

  return field;
}
