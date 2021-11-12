import { Observable, switchMap } from 'rxjs';

import {
  extractAjaxResponseData,
  findMany,
  FindManyOptions,
  fromDto,
  transformAndValidateMap,
} from '../generated';

import { AlertWithCurrentFeedback } from '@cali/common-models';
import { AlertWithCurrentFeedbackFindManyQueryDto } from '@cali/common-rest-dtos';

export class AlertWithCurrentFeedbackService {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL(`${apiUrl.toString()}/alert/with-current-feedback`);
  }

  /**
   * Find zero or more Model entities that matches the filter
   *
   * @param findManyQuery - Dto of the request query
   * @param options - Ajax request options
   * @returns an array of Model entities
   */
  public findMany$(
    findManyQuery?: AlertWithCurrentFeedbackFindManyQueryDto,
    options?: FindManyOptions,
  ): Observable<AlertWithCurrentFeedback[]> {
    return fromDto(
      findManyQuery,
      AlertWithCurrentFeedbackFindManyQueryDto,
    ).pipe(
      switchMap((params) =>
        findMany(this.apiUrl, { ...params }, options).pipe(
          extractAjaxResponseData(),
          transformAndValidateMap(AlertWithCurrentFeedback),
        ),
      ),
    );
  }
}
