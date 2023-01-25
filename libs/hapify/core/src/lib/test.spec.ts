import {
  and,
  isFieldActionAuth,
  isModelActionPublic,
  isPassword,
  not,
} from './helpers';
import {
  BooleanField,
  Model,
  NumberBasicField,
  NumberIntegerField,
  Project,
  StringBasicField,
  StringEmailField,
  StringPasswordField,
  StringTextField,
} from './nodes';

const idField = new NumberBasicField('Id').setPrimary(true).makeNotWritable();

const root = new Project('app').addModel(
  new Model('User')
    .addField(idField)
    .addField(new StringBasicField('FirstName').setMaxLength(50))
    .addField(new StringBasicField('LastName').setMaxLength(50))
    .addField(new StringEmailField('Email'))
    .addField(
      new StringPasswordField('Password')
        .setValidationRegex('/([0-9a-z]+)/')
        .makeNotReadable(),
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
  .filter(and(isFieldActionAuth('read')))
  .map((field) => field.name)
  .join(', ')}
`;

const field = root.models[0].fields[0];
if (and(not(isPassword))(field)) {
  // field is a string field, primary and ownership
}

root.models
  .filter(and(isModelActionPublic('search'), isModelActionPublic('count')))
  .map((model) => model.actionsScopes.count);
