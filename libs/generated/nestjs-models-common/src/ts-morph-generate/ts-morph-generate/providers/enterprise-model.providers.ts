import { Provider } from "@nestjs/common";
import { ENTERPRISE_SERVICE } from "../constants";
import { EnterpriseService } from "../services";

export const ENTERPRISE_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: ENTERPRISE_SERVICE,
                useClass: EnterpriseService,
              }
            ];
