import { ReverseProxyContainerConfig } from './interfaces';

import {
  ContainerDefinition,
  HttpContainer,
  HttpContainerPathPrefixConfig,
} from '@trxn/terraform-service-ecs';

export class ReverseProxyContainer extends HttpContainer<ReverseProxyContainerConfig> {
  protected getAppName(): string {
    return 'traefik';
  }

  protected getPort(): number {
    return 8080;
  }

  getDefinition(): ContainerDefinition {
    const definition = {
      ...super.getDefinition(),
      entryPoint: [
        'traefik',
        // '--accesslog=true',
        // '--log.level=DEBUG',
        '--ping=true',
        '--api.dashboard=true',
        '--providers.ecs=true',
        `--providers.ecs.clusters=${this.config.cluster.name}`,
        `--providers.ecs.region=${this.service.getRegion()}`,
        '--providers.ecs.exposedByDefault=false',
        '--providers.ecs.refreshSeconds=15',
      ],
      essential: true,
    };

    // Open port for load balancer
    if (definition.portMappings) {
      definition.portMappings.push({ containerPort: 80 });
    }

    return definition;
  }

  protected getHttpPathPrefixDockerLabels(): Record<string, string> {
    const labels = super.getHttpPathPrefixDockerLabels();
    const prefixes: HttpContainerPathPrefixConfig[] = Array.isArray(
      this.config.path,
    )
      ? this.config.path
      : [this.config.path];

    const name = this.getRouterName();
    labels[`traefik.http.routers.${name}.rule`] = prefixes
      .map(
        ({ prefix }) =>
          `PathPrefix(\`${prefix}/{service:[a-z]+}/\`) || HeadersRegexp(\`Referer\`, \`.*${prefix}/.*\`)`,
      )
      .join(' || ');

    return labels;
  }
}
