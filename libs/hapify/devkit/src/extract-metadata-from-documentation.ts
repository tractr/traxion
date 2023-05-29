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
    const match = line.trim().match(/@trxn\/(.*)/);
    if (match) {
      // [@trxn/maxLength, maxLength, '255']
      const [key, ...values] = match[1].split(':');
      if (values.length === 0) {
        metadata[key.trim()] = true;
      } else
        metadata[key.trim()] =
          values.length === 1 ? values[0].trim() : values.map((v) => v.trim());
    } else {
      docs.push(line);
    }
  }

  for (const validation of validations) {
    if (!validation(metadata)) {
      throw new Error('Invalid metadata');
    }
  }

  return {
    metadata: transforms.reduce((acc, transform) => transform(acc), metadata),
    documentation: docs.join('\n'),
  };
}
