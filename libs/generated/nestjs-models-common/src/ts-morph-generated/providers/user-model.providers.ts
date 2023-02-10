import { Provider } from "@nestjs/common";
import { UserService } from "./services";
import { USER_SERVICE } from "./user-model.constants";

export const USER_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: USER_SERVICE,
                useClass: UserService,
              }
            ];
