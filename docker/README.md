# Docker builds

## Build API

```bash
DOCKER_BUILDKIT=1 BUILDKIT_PROGRESS=plain docker build -f apps/api/Dockerfile --secret id=npmrc,src="${HOME}/.npmrc" --build-arg app=api .
```

## Build PWA

```bash
DOCKER_BUILDKIT=1 BUILDKIT_PROGRESS=plain docker build -f apps/pwa/Dockerfile --secret id=npmrc,src="${HOME}/.npmrc" --build-arg app=pwa .
```
