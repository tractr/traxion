import { Provider } from "@nestjs/common";
import { ANSWER_SERVICE } from "../constants";
import { AnswerService } from "../services";

export const ANSWER_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: ANSWER_SERVICE,
                useClass: AnswerService,
              }
            ];
