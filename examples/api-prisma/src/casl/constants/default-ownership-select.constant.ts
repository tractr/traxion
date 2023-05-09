import { DefaultOwnershipSelect } from '../types';

export const defaultOwnershipSelect: DefaultOwnershipSelect = {
  User: {
    id: true,
    roleId: true,
  },
  Role: {
    id: true,
  },
  Right: {
    id: true,
  },
};
