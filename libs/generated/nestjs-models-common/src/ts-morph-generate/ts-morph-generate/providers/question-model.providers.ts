import { Provider } from "@nestjs/common";
import { QUESTION_SERVICE } from "../constants";
import { QuestionService } from "../services";

export const QUESTION_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: QUESTION_SERVICE,
                useClass: QuestionService,
              }
            ];
