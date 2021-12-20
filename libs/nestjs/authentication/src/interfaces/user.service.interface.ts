import { UserType } from './user.interface';

export interface UserSelect {
  [key: string]: boolean | { select: UserSelect };
}

export interface UserService {
  findUnique(args: {
    where: { [key: string]: string | number };
    select?: UserSelect;
  }): Promise<UserType | null>;

  update(args: {
    where: {
      [key: string]: string | number;
    };
    data: {
      [key: string]: string;
    };
  }): Promise<UserType | null>;
}
