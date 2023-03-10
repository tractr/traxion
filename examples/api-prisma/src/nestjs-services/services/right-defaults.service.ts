import { Injectable } from '@nestjs/common';

@Injectable()
export class RightDefaultService {
  /**
   *         Return default internal fields
   *
   */
  getDefaultInternals() {
    return {
      createdAt: this.getDefaultCreatedAt(),
    };
  }

  /**
   *         Return default value for internal field 'createdAt'
   *
   */
  getDefaultCreatedAt() {
    return new Date();
  }
}
