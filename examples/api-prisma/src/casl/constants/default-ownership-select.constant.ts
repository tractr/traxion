import { DefaultOwnershipSelect } from "../types";

export const defaultOwnershipSelect: DefaultOwnershipSelect = {
              User: {
                  id: true,
    roleId: true
                },
    Profile: {
                  id: true,
    userId: true
                },
    Role: {
                  id: true
                },
    Right: {
                  id: true
                }
            };
