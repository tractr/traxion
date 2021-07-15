import { AbilityBuilder, AnyAbility } from '@casl/ability';

import { CaslUser } from './user.interfaces';

export type DefinePermissions<U extends CaslUser, A extends AnyAbility> = (
  user: U,
  builder: AbilityBuilder<A>,
) => void;
