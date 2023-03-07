import { Provider } from "@nestjs/common";
import { INTERNAL_FIELD_SERVICE } from "../constants";
import { InternalFieldService } from "../services";

export const INTERNAL_FIELD_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: INTERNAL_FIELD_SERVICE,
                useClass: InternalFieldService,
              }
            ];
