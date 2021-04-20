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
  if (field.subtype === 'text')
    errors.push(
      `Subtype 'text' is not handled yet. Remove it from field '${field.name}'`,
    );
  if (field.subtype === 'rich')
    errors.push(
      `Subtype 'rich' is not handled yet. Remove it from field '${field.name}'`,
    );
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
}
return { errors, warnings };
