import { DefaultOwnershipSelect } from '../types';

export const defaultOwnershipSelect: DefaultOwnershipSelect = {
  User: {
    id: true,
  },
  Profile: {
    id: true,
    userId: true,
  },
  Task: {
    id: true,
    authorId: true,
  },
};
