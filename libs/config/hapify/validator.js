/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-undef */

// Models validation script
// Model structure: https://docs.hapify.io/en/latest/templating/models-validator/#access-model-properties
const errors = [];
const warnings = [];

const { fields } = model;
const primary = fields.find((f) => f.primary);

// Check primary keys
if (!primary) {
  errors.push('Primary field must be defined');
} else {
  if (primary.name !== 'id') errors.push('Primary field must be named "id"');
  if (primary.type !== 'string')
    errors.push(
      'Primary field must be of type "string". Other types are not handled yet',
    );
  if (!primary.sortable)
    errors.push('Primary field must sortable as it is the default sort key');
  if (!primary.internal)
    errors.push('Primary field must internal as it is managed by the system');
}

// Check fieds properties
for (const field of fields) {
  if (field.subtype === 'rich')
    errors.push(
      `Subtype 'rich' is not handled yet. Remove it from field '${field.name}'`,
    );
  if (field.type === 'entity' && !(field.meta && field.meta.backRelation)) {
    errors.push(
      `Entity field must have the meta 'backRelation'. Fix field '${field.name}'`,
    );
  }
  if (field.subtype === 'manyOne')
    errors.push(
      `Subtype 'manyOne' is not handled yet. Remove it from field '${field.name}'`,
    );
  if (field.subtype === 'manyMany' && !field.multiple)
    errors.push(
      `Entity field with subtype 'manyMany' must also have 'multiple' property. Fix field '${field.name}'`,
    );
  if (field.subtype === 'oneMany' && field.multiple)
    errors.push(
      `Entity field with subtype 'oneMany' must not have 'multiple' property. Fix field '${field.name}'`,
    );
  if (field.subtype === 'oneOne' && field.multiple)
    errors.push(
      `Entity field with subtype 'oneOne' must not have 'multiple' property. Fix field '${field.name}'`,
    );
  if (field.type === 'entity' && !field.subtype)
    errors.push(
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
    errors.push(
      `Entity field must have the meta 'default'. Fix field '${field.name}'`,
    );
  }
  if (field.ownership && !(field.meta && field.meta.ownerKey)) {
    errors.push(
      `Entity field must have the meta 'ownerKey'. Fix field '${field.name}'`,
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
    errors.push(
      `The value of the meta 'maxLength' must be between 1 and 255. Fix field '${field.name}'`,
    );
  }
}
return { errors, warnings };
