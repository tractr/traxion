import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleDefaultService {
  /**
   *         Return default internal fields
   *
   */
  getDefaultInternals() {
    return {};
  }
}
