import { getUserModelFromSchema } from './get-user-model-from-schema';
import { Schema } from '../schema';

export function getUserModel(schema: Schema, userModelName?: string) {
  if (userModelName) {
    const user = schema.models.find((m) => m.name === userModelName);
    if (!user) {
      throw new Error(
        `User model specified in the configuration ${userModelName} not found`,
      );
    }

    return user;
  }

  return getUserModelFromSchema(schema);
}
