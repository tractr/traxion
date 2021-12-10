import { UserType } from './user.interface';

export interface UserService {
  findUnique(args: {
    where: { [key: string]: string | number };
    select?: Record<string, boolean>;
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
