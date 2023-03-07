import { Provider } from "@nestjs/common";
import { STRING_MODEL_SERVICE } from "../constants";
import { StringModelService } from "../services";

export const STRING_MODEL_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: STRING_MODEL_SERVICE,
                useClass: StringModelService,
              }
            ];
