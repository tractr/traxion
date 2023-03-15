export type FieldMetadataValidationCallback = (
  value: Record<string, unknown>,
) => true;

export type FieldMetadataTransformCallback = (
  value: Record<string, unknown>,
) => Record<string, unknown>;

export type FieldValidations = FieldMetadataValidationCallback[];
export type FieldTransforms = FieldMetadataTransformCallback[];
