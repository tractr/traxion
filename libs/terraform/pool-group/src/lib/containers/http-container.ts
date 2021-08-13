import { kebab } from 'case';

import { BackendContainer } from './backend-container';
import { ContainerConfig } from './container';

export interface HttpContainerConfig extends ContainerConfig {
  path: {
    prefix: string;
    stripPrefix: boolean;
  };
  auth?: {
    user: string;
    passwordHash: string;
  };
}
/**
 * This container is meant to be used by another one, as its backend
 * For example, Postgres which is used by the API
 */
export abstract class HttpContainer<
  T extends HttpContainerConfig = HttpContainerConfig,
> extends BackendContainer<T> {
  protected getDockerLabels(): Record<string, string> {
    return {
      ...this.getHttpPathPrefixDockerLabels(),
      ...this.getAuthDockerLabels(),
      ...this.getMiddlewaresListDockerLabels(),
    };
  }

  protected getHttpPathPrefixDockerLabels(): Record<string, string> {
    if (!this.config.path.prefix.startsWith('/')) {
      throw new Error('pathPrefix must start with /');
    }
    const name = this.getRouterName();
    const output = {
      [`traefik.http.routers.${name}.rule`]: `PathPrefix(\`${this.config.path.prefix}\`)`,
      [`traefik.http.services.${name}.loadbalancer.server.port`]: `${this.getPort()}`,
      'traefik.enable': 'true',
    };
    // Append strip prefix middleware if needed
    if (this.config.path.stripPrefix) {
      output[
        `traefik.http.middlewares.${name}-stripprefix.stripprefix.prefixes`
      ] = `${this.config.path.prefix}`;
    }
    return output;
  }

  protected getAuthDockerLabels(): Record<string, string> {
    if (this.config.auth) {
      const name = this.getRouterName();
      return {
        [`traefik.http.middlewares.${name}-auth.basicauth.users`]: `${this.config.auth.user}:${this.config.auth.passwordHash}`,
        [`traefik.http.middlewares.${name}-auth.basicauth.removeheader`]:
          'true',
      };
    }
    return {};
  }

  protected getMiddlewaresListDockerLabels(): Record<string, string> {
    const output = [];
    const name = this.getRouterName();
    if (this.config.path.stripPrefix) {
      output.push(`${name}-stripprefix`);
    }
    if (this.config.auth) {
      output.push(`${name}-auth`);
    }
    if (output.length) {
      return {
        [`traefik.http.routers.${name}.middlewares`]: output.join(','),
      };
    }
    return {};
  }

  protected getRouterName(): string {
    return kebab(this.config.name);
  }
}
