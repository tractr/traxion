import { Provider } from "@nestjs/common";
import { MESSAGE_SERVICE } from "../constants";
import { MessageService } from "../services";

export const MESSAGE_SERVICES_PROVIDERS: Provider[] = [
              {
                provide: MESSAGE_SERVICE,
                useClass: MessageService,
              }
            ];
