import { Provider } from "@nestjs/common";
import { DEPARTMENT_SERVICE } from "../constants";
import { DepartmentService } from "../services";

export const DEPARTMENT_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: DEPARTMENT_SERVICE,
                useClass: DepartmentService,
              }
            ];
