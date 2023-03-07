import { Provider } from "@nestjs/common";
import { ROLE_SERVICE } from "../constants";
import { RoleService } from "../services";

export const ROLE_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: ROLE_SERVICE,
                useClass: RoleService,
              }
            ];
