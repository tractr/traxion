import { Provider } from "@nestjs/common";
import { UNIQUE_VALUE_FIELD_SERVICE } from "../constants";
import { UniqueValueFieldService } from "../services";

export const UNIQUE_VALUE_FIELD_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: UNIQUE_VALUE_FIELD_SERVICE,
                useClass: UniqueValueFieldService,
              }
            ];
