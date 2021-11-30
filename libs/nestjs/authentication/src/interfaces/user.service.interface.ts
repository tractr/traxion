import { User } from './user.interface';

export interface UserService {
  findUnique(args: {
    where: { [key: string]: string | number };
    select?: Record<string, boolean>;
  }): Promise<User | null>;

  update(args: {
    where: {
      [key: string]: string | number;
    };
    data: {
      [key: string]: string;
    };
  }): Promise<User | null>;
}
