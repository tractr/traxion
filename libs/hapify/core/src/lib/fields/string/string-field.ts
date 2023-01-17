import {
  StringBasicField,
  StringEmailField,
  StringPasswordField,
  StringRichField,
  StringTextField,
  StringUrlField,
} from './types';

export type StringField =
  | StringBasicField
  | StringUrlField
  | StringRichField
  | StringTextField
  | StringEmailField
  | StringPasswordField;
