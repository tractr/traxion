import { Model, Schema } from '@trxn/hapify-core';

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
  schema.models.forEach((model) => {
    console.info(model.name, model.metadata);
  });
  // If no user model is specified in the config, we will try to extract it from the schema
  let userModel = schema.models.find((model) => !!model.metadata?.user);

  if (!userModel) {
    userModel = schema.models.find(
      (model) => model.name.toLowerCase() === 'user',
    );
  }

  if (!userModel) {
    throw new Error(
      `The user model could not be extracted from the schema. You can specify the user model name in the config part of the generation or flag a model as the user model by adding the @trxn/user directive above the model inside the comment part`,
    );
  }

  return userModel;
}
