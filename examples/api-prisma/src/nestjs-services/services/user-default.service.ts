import { Injectable } from "@nestjs/common";

@Injectable()
export class UserDefaultService {
    /**
     *         Return default internal fields
     *         
     */
    getDefaultInternals() {
        return {};
    }
}
