import { Provider } from "@nestjs/common";
import { RoleService } from "./services";
import { ROLE_SERVICE } from "./role-model.constants";

export const ROLE_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: ROLE_SERVICE,
                useClass: RoleService,
              }
            ];
