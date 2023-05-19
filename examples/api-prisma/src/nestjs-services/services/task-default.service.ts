import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskDefaultService {
  /**
   *         Return default internal fields
   *
   */
  getDefaultInternals() {
    return {};
  }
}
