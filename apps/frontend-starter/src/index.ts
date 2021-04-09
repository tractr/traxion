import { tap } from 'rxjs/operators';
import { post } from './tag.service';

async function start() {
  const tag = {
    label: 'Test label tag'
  };
  post('https://localhost:3000/tag', tag).pipe(
    tap(console.log)
  ).subscribe();
}

start();
