import { Provider } from "@nestjs/common";
import { STRING_MODEL_UNIQUE_SERVICE } from "../constants";
import { StringModelUniqueService } from "../services";

export const STRING_MODEL_UNIQUE_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: STRING_MODEL_UNIQUE_SERVICE,
                useClass: StringModelUniqueService,
              }
            ];
