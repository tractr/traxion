export type UserId = string | number;

export type User = {
  [key: string]: unknown;
};

export type MinimalUser = User & {
  id: UserId;
  email: string;
  password: string;
};

export interface UserOrmService {
  findUnique<U extends User = MinimalUser>(params: {
    where: {
      id?: UserId;
      [key: string]: unknown;
    };
    select?: {
      [key: string]: unknown;
    };
  }): Promise<U | null>;

  update<U extends User = MinimalUser>(params: {
    where: {
      id?: UserId;
      [key: string]: unknown;
    };
    data?: {
      [key: string]: unknown;
    };
  }): Promise<U>;
}
