import { Provider } from "@nestjs/common";
import { RIGHT_AUTHORIZED_SERVICE } from "../constants";
import { RightAuthorizedService } from "../services";

export const RIGHT_SERVICES_PROVIDERS: Provider[] = [
              RightAuthorizedService,
              {
                provide: RIGHT_AUTHORIZED_SERVICE,
                useExisting: RightAuthorizedService,
              },
            ];
