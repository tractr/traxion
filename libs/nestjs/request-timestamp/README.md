# Nestjs - Request timestamp

Provides a middleware to add timestamp of the request in the response object.

```typescript
res.locals.timestamp = Date.now();
```

To retrieve this value:

```typescript
@Injectable({ scope: Scope.REQUEST })
export class SentryPerRequestLogger extends SentryLogger {
  constructor(
    @Inject(REQUEST)
    protected readonly request: Request,
  ) {
    super();

    const timestamp = this.request.res.locals.timestamp;
  }
}
```
