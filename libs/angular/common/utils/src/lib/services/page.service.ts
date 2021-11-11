import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PageInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private page$ = new BehaviorSubject<PageInterface>({
    title: 'page_title-default',
  });

  /**
   * Set the current page header
   *
   * @param page
   */
  setPage(page: PageInterface): void {
    this.page$.next(page);
  }

  /**
   * Retrieve the current page as Observable
   *
   * @return {Observable<PageInterface>}
   */
  getPage(): Observable<PageInterface> {
    return this.page$.asObservable();
  }
}
