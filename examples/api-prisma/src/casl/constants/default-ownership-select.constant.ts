import { DefaultOwnershipSelect } from '../types';

export const defaultOwnershipSelect: DefaultOwnershipSelect = {
  User: {
    id: true,
  },
  Task: {
    id: true,
    authorId: true,
  },
};
