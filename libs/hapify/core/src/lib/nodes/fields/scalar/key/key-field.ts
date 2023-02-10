import { KeyNumberField, KeyStringField } from './types';

export type KeyField = KeyStringField | KeyNumberField;
// Todo: valider qu'on veut expliciter les subsets pour les prédicats
export type PrimaryField = KeyField & { primary: true };
