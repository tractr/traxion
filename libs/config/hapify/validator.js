/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

// Models validation script
// Model structure: https://docs.hapify.io/en/latest/templating/models-validator/#access-model-properties
let res = { errors: [], warnings: [] };

const { fields } = model;
const primary = fields.find((f) => f.primary);

const ON_DELETE_OR_ON_UPDATE_VALIDATORS = [
  'Cascade',
  'Restrict',
  'NoAction',
  'SetNull',
  'SetDefault',
];

// Check primary keys
if (!primary) {
  res.errors.push('Primary field must be defined');
} else {
  if (primary.name !== 'id')
    res.errors.push('Primary field must be named "id"');
  if (primary.type !== 'string')
    res.errors.push(
      'Primary field must be of type "string". Other types are not handled yet',
    );
  if (!primary.sortable)
    res.errors.push(
      'Primary field must sortable as it is the default sort key',
    );
  if (!primary.internal)
    res.errors.push(
      'Primary field must internal as it is managed by the system',
    );
}

// Check fieds properties
for (const field of fields) {
  if (field.subtype === 'rich')
    res.errors.push(
      `Subtype 'rich' is not handled yet. Remove it from field '${field.name}'`,
    );
  if (
    field.type === 'entity' &&
    field.subtype !== 'manyOne' &&
    !(field.meta && field.meta.backRelation)
  ) {
    res.errors.push(
      `Entity field must have the meta 'backRelation'. Fix field '${field.name}'`,
    );
  }
  if (field.subtype === 'manyOne') {
    if (!field.searchable) {
      res.errors.push(
        `ManyOne field must be searchable. Fix field '${field.name}'`,
      );
    } else if (
      field.primary ||
      field.unique ||
      field.label ||
      field.nullable ||
      field.multiple ||
      field.embedded ||
      field.sortable ||
      field.hidden ||
      field.internal ||
      field.restricted ||
      field.ownership
    ) {
      res.errors.push(
        `ManyOne field must not have the following properties: primary, unique, label, nullable, multiple, embedded, sortable, hidden, internal, restricted, ownership. Fix field '${field.name}'`,
      );
    } else {
      res.warnings.push(
        `Subtype 'manyOne' is used to
only be able to filter on this relation.
It must be the same name as the backRelation
field from the oneMany entity, and filterable.
Consider to define this relation on the
oneMany entity instead.`,
      );
    }
  }
  if (field.subtype === 'manyMany' && !field.multiple)
    res.errors.push(
      `Entity field with subtype 'manyMany' must also have 'multiple' property. Fix field '${field.name}'`,
    );
  if (field.subtype === 'oneMany' && field.multiple)
    res.errors.push(
      `Entity field with subtype 'oneMany' must not have 'multiple' property. Fix field '${field.name}'`,
    );
  if (field.subtype === 'oneOne' && field.multiple)
    res.errors.push(
      `Entity field with subtype 'oneOne' must not have 'multiple' property. Fix field '${field.name}'`,
    );
  if (field.type === 'entity' && !field.subtype)
    res.errors.push(
      `Entity field needs to have subtype. Fix field '${field.name}'`,
    );
  if (
    field.internal &&
    !field.nullable &&
    !field.ownership &&
    ['datetime', 'string', 'number', 'boolean', 'enum'].indexOf(field.type) <=
      -1 &&
    !(field.meta && field.meta.default)
  ) {
    res.errors.push(
      `Entity field must have the meta 'default'. Fix field '${field.name}'`,
    );
  }
  if (field.ownership && !(field.meta && field.meta.ownerStringPath)) {
    res.errors.push(
      `Entity field must have the meta 'ownerStringPath'. Fix field '${field.name}'`,
    );
  }
  if (
    field.ownership &&
    field.internal &&
    !field.primary &&
    field.meta.ownerStringPath !== 'user.id'
  ) {
    res.errors.push(
      `Entity field with internal and ownership options must have the meta 'ownerStringPath' with the 'user.id' value. Fix field '${field.name}'`,
    );
  }
  if (
    field.type === 'string' &&
    field.subtype !== 'text' &&
    field.meta &&
    field.meta.maxLength &&
    (field.meta.maxLength > 255 ||
      field.meta.maxLength < 1 ||
      Number.isNaN(field.meta.maxLength))
  ) {
    res.errors.push(
      `The value of the meta 'maxLength' must be between 1 and 255. Fix field '${field.name}'`,
    );
  }

  if (field.meta) {
    if (field.meta.onDelete)
      res = validatorsMergeReturns(
        res,
        validateOnDelete(field.meta.onDelete, field.name),
      );
    if (field.meta.onUpdate)
      res = validatorsMergeReturns(
        res,
        validateOnUpdate(field.meta.onUpdate, field.name),
      );

    if (field.meta.compositeUniqueness) {
      if (!field.unique)
        res.errors.push(
          `'compositeUniqueness' metadata can only be used on unique fields`,
        );
      if (!field.subtype === 'oneOne')
        res.errors.push(
          `'compositeUniqueness' metadata should not be used on oneOne relation as it already uses a uniqueness constraints`,
        );
    }
  }
}

// TODO remove this code from there and use the src code when this issue is fixed:
// https://tractr.atlassian.net/browse/HAP-490

/**
 * Validate the onDelete and onUpdate action type.
 * @param on - onDelete or onUpdate
 * @param actionType - the action type
 * @param fieldName - the field name
 * @returns
 */
function validateOnUpdateAndOnDeleteActionType(on, actionType, fieldName) {
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
 * Merge two or more validator returns.
 * @param validators - array of validators
 * @returns
 */
function validatorsMergeReturns(...validators) {
  const errors = [];
  const warnings = [];
  validators.forEach((validator) => {
    if (validator.errors) {
      errors.push(...validator.errors);
    }
    if (validator.warnings) {
      warnings.push(...validator.warnings);
    }
  });
  return { errors, warnings };
}

/**
 * Validate the onDelete action type.
 * @param actionType - the action type
 * @param fieldName the field name
 * @returns
 */
function validateOnDelete(actionType, fieldName) {
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
function validateOnUpdate(actionType, fieldName) {
  return validateOnUpdateAndOnDeleteActionType(
    'onUpdate',
    actionType,
    fieldName,
  );
}

return res;
