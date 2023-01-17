import {
  BooleanField,
  isNumber,
  isPassword,
  isString,
  NumberBasicField,
  NumberIntegerField,
  StringBasicField,
  StringEmailField,
  StringPasswordField,
  StringTextField,
} from './fields';
import { Model } from './model';
import { and, not, or } from './operators';
import { Root } from './root';

const idField = new NumberBasicField('Id')
  .setPrimary(true)
  .setInternal(true)
  .setOwnership(true);

const root = new Root('app').addModel(
  new Model('User')
    .addField(idField)
    .addField(new StringBasicField('FirstName').setMaxLength(50))
    .addField(new StringBasicField('LastName').setMaxLength(50))
    .addField(new StringEmailField('Email'))
    .addField(
      new StringPasswordField('Password')
        .setValidationRegex('/([0-9a-z]+)/')
        .setInternal(true),
    )
    .addField(
      new StringTextField('Description')
        .setNullable(true)
        .addMetadata('foo', 'bar'),
    )
    .addField(new BooleanField('Enabled').setDefaultValue(false))
    .addField(
      new NumberIntegerField('Credits')
        .setDefaultValue(10)
        .setMax(1000)
        .setNotes('Amount of credits remaining'),
    ),
);

const output = `
${root.models[0].fields
  .filter(or(isNumber, and(isString, not(isPassword))))
  .map((field) => field.name)
  .join(', ')}
`;

const field = root.models[0].fields[0];
if (isString(field)) {
  // field is a string field, primary and ownership
}
