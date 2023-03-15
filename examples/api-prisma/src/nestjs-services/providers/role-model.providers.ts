import { Provider } from "@nestjs/common";
import { ROLE_SERVICE, ROLE_DEFAULT_SERVICE } from "../constants";
import { RoleService, RoleDefaultService } from "../services";

export const ROLE_SERVICES_PROVIDERS: Provider[] = [
              RoleService,
              {
                provide: ROLE_SERVICE,
                useExisting: RoleService,
              },
              RoleDefaultService,
              {
                provide: ROLE_DEFAULT_SERVICE,
                useExisting: RoleDefaultService,
              }
            ];
