import { Injectable } from '@nestjs/common';

@Injectable()
export class RightDefaultService {
  /**
   *         Return default internal fields
   *
   */
  getDefaultInternals() {
    return {};
  }
}
