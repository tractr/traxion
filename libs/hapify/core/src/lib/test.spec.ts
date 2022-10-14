import { Root } from './root';
import { Model } from './model';
import {
  BooleanField,
  NumberField,
  NumberIntegerField,
  StringEmailField,
  StringField,
  StringPasswordField,
  StringTextField,
} from './fields';

const root = new Root('app').addModel(
  new Model('User')
    .addField(
      new NumberField('Id')
        .setPrimary(true)
        .setInternal(true)
        .setOwnership(true),
    )
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
        .setMin(1000)
        .setNotes('Amount of credits remaining'),
    ),
);
