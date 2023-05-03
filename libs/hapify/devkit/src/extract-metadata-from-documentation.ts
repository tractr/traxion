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

  const metadata: Record<string, string> = {};
  const lines = documentation.split('\n');
  const docs = [];

  for (const line of lines) {
    // @trxn/maxLength: 255
    const match = line.trim().match(/@trxn\/(\w+):(.*)/);
    if (match) {
      // [@trxn/maxLength, maxLength, '255']
      const [, key, value] = match;
      metadata[key] = value;
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
    metadata: transforms.reduce(
      (acc, transform) => transform(acc),
      metadata as Record<string, unknown>,
    ),
    documentation: docs.join('\n'),
  };
}
