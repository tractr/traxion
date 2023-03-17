import { subject } from '@casl/ability';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role, Right, User } from '@prisma/client';

import { AppAbility } from '../../casl';

import { Action } from '@trxn/nestjs-casl';

export type UserValidateOwnership = {
  id: User['id'];
  roles?: RoleValidateOwnership[];
};

export type RoleValidateOwnership = {
  userId: Role['userId'];
  rights?: RightValidateOwnership[];
  user?: UserValidateOwnership;
};

export type RightValidateOwnership = {
  role: Right['id'];
  roles?: RoleValidateOwnership[];
}

@Injectable()
export class OwnershipsService {
  validateUserOwnership(abilities: AppAbility, user: UserValidateOwnership) {
    if (abilities?.cannot(Action.Read, subject('User', user)))
      throw new ForbiddenException('cannot read this user');

    if (user.roles) user.roles.forEach((role) => this.validateRoleOwnership(abilities, role));
  }

  validateRoleOwnership(abilities: AppAbility, role?: UserValidateOwnership) {
    if ()
  }
}
