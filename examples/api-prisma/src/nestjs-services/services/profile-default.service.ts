import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileDefaultService {
  /**
   *         Return default internal fields
   *
   */
  getDefaultInternals() {
    return {};
  }
}
