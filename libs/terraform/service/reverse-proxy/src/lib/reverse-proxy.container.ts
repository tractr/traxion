import { ReverseProxyContainerConfig } from './interfaces';

import {
  ContainerDefinition,
  HttpContainer,
} from '@tractr/terraform-service-ecs';

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
        `--providers.ecs.clusters=${this.config.clusterName}`,
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

    const name = this.getRouterName();
    labels[
      `traefik.http.routers.${name}.rule`
    ] = `PathPrefix(\`${this.config.path.prefix}/{service:[a-z]+}/\`) || HeadersRegexp(\`Referer\`, \`.*${this.config.path.prefix}/.*\`)`;

    return labels;
  }
}
