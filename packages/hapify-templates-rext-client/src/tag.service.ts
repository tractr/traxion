/**
 * This service is a first iteration of the reXt-client
 * We will write for now a simulation of the generate service for a specific model.
 * The model we're gonna use is User, generated in the backend-starter's app.
 */

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

// Tag dto ?
interface Tag {
  label: string;
}

export class TagService {
  constructor(private apiUrl: string) {}

  /**
   * Create method
   */
  public create(user: Tag): Observable<Tag> {
    return ajax({
      url: this.apiUrl,
      method: 'POST',
      headers: {
        // withCredentials param is copied from base-model-service,
        // is it useful for new Auth system ?
        withCredentials: true,
      },
      body: user,
    }).pipe(
      // From here, we get the response
      map((apiResponse: AjaxResponse) => apiResponse),

      // We could filter the response ?
      //
      filter((apiResponse) => apiResponse.status === 200),
      //
      // If filter is used =>
      // if response is 200: the stream continues,
      // else: the stream stops.

      // Perhaps we need to notify if a user happened here,
      // if so, don't use the filter operator.

      // Then, we could return the object created ?
      map(() => user),
    );
  }
}
