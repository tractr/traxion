TL;TR

```bash
DOCKER_BUILDKIT=1 BUILDKIT_PROGRESS=plain docker build -f docker/Dockerfile --secret id=npmrc,src=/<path-to-your-npmrc>/.npmrc --build-arg app=apps/<name-of-your-app-you-want-to-build> .
```