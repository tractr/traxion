import { Provider } from "@nestjs/common";
import { TAG_SERVICE } from "../constants";
import { TagService } from "../services";

export const TAG_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: TAG_SERVICE,
                useClass: TagService,
              }
            ];
