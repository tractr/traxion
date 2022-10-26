import { Root } from './root';
import { Model } from './model';
import {
  BooleanField,
  number,
  NumberField,
  NumberIntegerField,
  ownership,
  password,
  primary,
  string,
  StringEmailField,
  StringField,
  StringPasswordField,
  StringTextField,
} from './fields';
import { and, or } from './operators';

const idField = new NumberField('Id')
  .setPrimary(true)
  .setInternal(true)
  .setOwnership(true);

const root = new Root('app').addModel(
  new Model('User')
    .addField(idField)
    .addField(new StringField('FirstName').setMaxLength(50))
    .addField(new StringField('LastName').setMaxLength(50))
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
  .filter(or(number, and(string, password)))
  .map((field) => field.name)}
`;

const field = root.models[0].fields[0];
if (and(string, primary, ownership)(field)) {
}
