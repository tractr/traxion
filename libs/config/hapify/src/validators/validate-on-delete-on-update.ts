import { ValidatorReturn } from './validators.interface';

export const ON_DELETE_OR_ON_UPDATE_VALIDATORS = [
  'Cascade',
  'Restrict',
  'NoAction',
  'SetNull',
  'SetDefault',
];

/**
 * Validate the onDelete and onUpdate action type.
 * @param on - onDelete or onUpdate
 * @param actionType - the action type
 * @param fieldName - the field name
 * @returns
 */
export function validateOnUpdateAndOnDeleteActionType(
  on: 'onDelete' | 'onUpdate',
  actionType: string | undefined,
  fieldName?: string,
): ValidatorReturn {
  if (!ON_DELETE_OR_ON_UPDATE_VALIDATORS.includes(actionType ?? '')) {
    return {
      errors: [
        `The value of the meta '${on}' must be one of the following: 'Cascade', 'Restrict', 'NoAction', 'SetNull', 'SetDefault'. Fix field '${fieldName}'`,
      ],
    };
  }

  return {};
}

/**
 * Validate the onDelete action type.
 * @param actionType - the action type
 * @param fieldName the field name
 * @returns
 */
export function validateOnDelete(
  actionType: string | undefined,
  fieldName?: string,
): ValidatorReturn {
  return validateOnUpdateAndOnDeleteActionType(
    'onDelete',
    actionType,
    fieldName,
  );
}

/**
 * Validate the onUpdate action type.
 * @param actionType - the action type
 * @param fieldName the field name
 * @returns
 */
export function validateOnUpdate(
  actionType: string | undefined,
  fieldName?: string,
): ValidatorReturn {
  return validateOnUpdateAndOnDeleteActionType(
    'onUpdate',
    actionType,
    fieldName,
  );
}
