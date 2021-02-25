// Models validation script

// Model structure: https://docs.hapify.io/en/latest/templating/models-validator/#access-model-properties
const errors = [];
const warnings = [];

// eslint-disable-next-line no-undef
const primary = model.fields.find((f) => f.primary);
if (!primary) {
  errors.push('Primary field must be defined');
} else if (primary.name !== 'id') {
  errors.push('Primary field must be named "id"');
}

return { errors, warnings };
