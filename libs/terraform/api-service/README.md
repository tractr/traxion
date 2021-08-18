# API Backend service

## Configuration

### Required secrets

These secrets must be defined manually in AWS Secret Manager. They are used at
the runtime.

Example:

```env
POSTGRES_USER
POSTGRES_PASSWORD
COOKIE_SECRET
JWT_SECRET
FILE_STORAGE_ACCESS_KEY
FILE_STORAGE_SECRET_KEY
```

### Optional environments

These environments can be defined at the build stage.

```env
POSTGRES_DB=api
POSTGRES_DB_TEST=testing
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_SCHEMA=public
POSTGRES_OPTIONS
```
