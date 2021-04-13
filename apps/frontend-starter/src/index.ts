import { Tag } from '../generated/models';
import { TagService } from './tag.service';

function start() {
  const tagService = new TagService('http://localhost:3000');

  const test$ = tagService.findUnique({
    id: '9b1b5ee5-e278-47ac-8b9b-79821b16ab67',
  });

  test$.subscribe(
    (info) => console.info('next', info, (info as any)[0] instanceof Tag),
    (error) => console.error('error', error),
    () => console.info('complete'),
  );
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
