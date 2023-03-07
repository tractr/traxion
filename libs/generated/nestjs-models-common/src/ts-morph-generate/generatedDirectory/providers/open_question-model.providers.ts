import { Provider } from "@nestjs/common";
import { OPEN_QUESTION_SERVICE } from "../constants";
import { OpenQuestionService } from "../services";

export const OPEN_QUESTION_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: OPEN_QUESTION_SERVICE,
                useClass: OpenQuestionService,
              }
            ];
