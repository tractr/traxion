import { Provider } from "@nestjs/common";
import { PROFILE_AUTHORIZED_SERVICE } from "../constants";
import { ProfileAuthorizedService } from "../services";

export const PROFILE_AUTHORIZED_SERVICE_PROVIDER: Provider[] = [
              ProfileAuthorizedService,
              {
                provide: PROFILE_AUTHORIZED_SERVICE,
                useExisting: ProfileAuthorizedService,
              },
            ];
