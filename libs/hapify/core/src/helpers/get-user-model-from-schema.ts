import { Field } from '../fields';
import { Model } from '../models';
import { Schema } from '../schema';

/**
 * Extract from the schema the User model
 *
 * You can specify the User model name in the config part of the generation, but
 * if not specified, it will be extracted from the schema
 *
 * Inside the shema you can flag a model as the User model by adding the
 * @trxn/user directive above the model inside the comment part
 *
 * @example
 * // @trxn/user
 * model User {
 *  id Int @id @default(autoincrement())
 *  email String @unique
 *  password String
 * }
 *
 * If nothing is specified this function will search for a model named User (case insensitive)
 * And if it doesn't find it, it will throw an error
 *
 * @param schema
 * @returns
 */
export function getUserModelFromSchema(schema: Schema): Model {
  // If no user model is specified in the config, we will try to extract it from the schema
  let userModel = schema.models.filter((model) => !!model.metadata?.user);

  if (userModel.length === 0) {
    userModel = schema.models.filter(
      (model) =>
        model.name.toLowerCase() === 'user' ||
        model.name.toLowerCase() === 'users',
    );
  }

  if (userModel.length === 0) {
    throw new Error(
      `The user model could not be extracted from the schema. You can specify the user model name in the config part of the generation or flag a model as the user model by adding the @trxn/user directive above the model inside the comment part`,
    );
  }

  if (userModel.length > 1) {
    throw new Error(`Multiple user models were found in the schema.`);
  }

  return userModel[0];
}

export function getRoleFieldFromUserModel(userModel: Model): Field | null {
  let role: Field | undefined;

  role = userModel.fields.find(
    (field) =>
      field.metadata?.roleField === true || field.metadata?.roles === true,
  );

  if (!role) {
    role = userModel.fields.find(
      (field) =>
        field.name.toLowerCase() === 'role' ||
        field.name.toLowerCase() === 'roles',
    );
  }

  return role || null;
}

export function getLoginFieldFromUserModel(userModel: Model): Field | null {
  let login: Field | undefined;

  login = userModel.fields.find((field) => field.metadata?.loginField === true);

  if (!login) {
    login = userModel.fields.find(
      (field) =>
        field.name.toLowerCase() === 'login' ||
        field.name.toLowerCase() === 'email',
    );
  }

  return login || null;
}

export function getPasswordFieldFromUserModel(userModel: Model): Field | null {
  let password: Field | undefined;

  password = userModel.fields.find(
    (field) => field.metadata?.passwordField === true,
  );

  if (!password) {
    password = userModel.fields.find(
      (field) => field.name.toLowerCase() === 'password',
    );
  }

  return password || null;
}
