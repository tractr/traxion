import { Provider } from "@nestjs/common";
import { VARIABLE_SERVICE } from "../constants";
import { VariableService } from "../services";

export const VARIABLE_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: VARIABLE_SERVICE,
                useClass: VariableService,
              }
            ];
