import { FieldDeclaration } from '@trxn/hapify-core';

export function encryptedMetadata(field: FieldDeclaration): FieldDeclaration {
  const { encrypted, ...metadata } = field.metadata || {};

  const typeField = field.type;

  if (typeField !== 'string') {
    if (encrypted) {
      throw new Error(
        `encrypted metadata is only available for string fields, not for ${typeField} fields.`,
      );
    }
    return field;
  }

  if ((typeof encrypted === 'boolean' && encrypted) || encrypted === 'true') {
    return {
      ...field,
      isEncrypted: true,
      metadata,
    };
  }

  return field;
}
