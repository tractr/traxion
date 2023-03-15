import {
  FieldTransforms,
  FieldValidations,
} from './interfaces/validations.interface';

export function extractMetadataFromDocumentation(
  documentation?: string,
  validations: FieldValidations = [],
  transforms: FieldTransforms = [],
) {
  if (!documentation) {
    return {};
  }

  const metadata: Record<string, unknown> = {};
  const lines = documentation.split('\n');
  const docs = [];

  for (const line of lines) {
    // @trxn/maxLength: 255
    const match = line.trim().match(/^@trxn\/(\w*)(\s*:\s*(.*))?$/);
    if (match) {
      // ['@trxn/maxLength: 255', 'maxLength', ': 255', '255']
      // eslint-disable-next-line prefer-destructuring
      metadata[match[1]] = typeof match[3] === undefined ? true : match[3];
    } else {
      docs.push(line);
    }
  }

  for (const validation of validations) {
    validation(metadata);
  }

  return {
    metadata: transforms.reduce((acc, transform) => transform(acc), metadata),
    documentation: docs.join('\n'),
  };
}
