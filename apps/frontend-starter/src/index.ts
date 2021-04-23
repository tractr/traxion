/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Tag } from '@generated/models';
import { RextClient } from '@generated/rext-client';
import { of } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';


function start() {
  const client = new RextClient('http://localhost:3000');

  of(1)
    .pipe(
      tap(() => console.info('Find a unique tag')),
      mapTo([
        {
          id: '9e5677e5-9b51-45cc-9ec3-177c0a107015',
        },
      ]),
      tap(console.info),
      client.tag.findUnique(),
      tap((tag) => console.info('Found', tag)),

      tap(() => console.info('Count number of tag')),
      switchMap((val: Tag) =>
        client.tag.count$().pipe(
          tap((newTag) => console.info(`Tag number:`, newTag)),
          mapTo(val),
        ),
      ),

      tap(() => console.info('Create a new tag')),
      map((tag: Tag) => ({
        label: `${tag.label}-${new Date().getTime()}`,
      })),
      client.tag.create(),
      tap((newTag) => console.info(`Tag created`, newTag)),

      tap(() => console.info('Count number of tag')),
      switchMap((val) =>
        client.tag.count$().pipe(
          tap((newTag) => console.info(`Tag number:`, newTag)),
          mapTo(val),
        ),
      ),

      tap((tag) => console.info('Update tag', tag)),
      map((tag: Tag) => [
        { id: tag.id },
        {
          label: `${tag.label}-updated`,
        },
      ]),
      client.tag.update(),
      tap((newTag: Tag) => console.info(`Tag updated`, newTag)),

      tap(() => console.info('Count number of tag')),
      switchMap((val: Tag) =>
        client.tag.count$().pipe(
          tap((newTag) => console.info(`Tag number:`, newTag)),
          mapTo(val),
        ),
      ),

      tap((tag) => console.info('Delete tag', tag)),
      map((tag: Tag) => ({ id: tag.id })),
      client.tag.delete(),
      tap((deletedTag: Tag) => console.info(`Tag deleted`, deletedTag)),

      tap(() => console.info('Count number of tag')),
      switchMap((val: Tag) =>
        client.tag.count$().pipe(
          tap((newTag) => console.info(`Tag number:`, newTag)),
          mapTo(val),
        ),
      ),
    )
    .subscribe(
      (info) => console.info('next', info),
      (error) => console.error('error', error),
      () => console.info('complete'),
    );
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
