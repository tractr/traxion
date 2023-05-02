import { Provider } from "@nestjs/common";
import { RIGHT_SERVICE, RIGHT_DEFAULT_SERVICE } from "../constants";
import { RightService, RightDefaultService } from "../services";

export const RIGHT_SERVICES_PROVIDERS: Provider[] = [
              RightService,
              {
                provide: RIGHT_SERVICE,
                useExisting: RightService,
              },
              RightDefaultService,
              {
                provide: RIGHT_DEFAULT_SERVICE,
                useExisting: RightDefaultService,
              }
            ];
