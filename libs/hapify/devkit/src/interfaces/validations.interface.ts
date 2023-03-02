export type FieldMetadataValidationCallback = (
  value: Record<string, string>,
) => boolean;

export type FieldMetadataTransformCallback = (
  value: Record<string, unknown>,
) => Record<string, unknown>;

export type FieldValidations = FieldMetadataValidationCallback[];
export type FieldTransforms = FieldMetadataTransformCallback[];
