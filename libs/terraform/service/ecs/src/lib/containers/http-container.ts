import { kebab } from 'case';

import {
  HttpContainerConfig,
  HttpContainerPathPrefixConfig,
} from '../interfaces';
import { BackendContainer } from './backend-container';

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
    const prefixes: HttpContainerPathPrefixConfig[] = Array.isArray(
      this.config.path,
    )
      ? this.config.path
      : [this.config.path];

    let outputs: Record<string, string> = {};
    const stripPrefixes: string[] = [];
    const name = this.getRouterName();

    prefixes.forEach(({ prefix, stripPrefix }) => {
      if (!prefix.startsWith('/')) {
        throw new Error('pathPrefix must start with /');
      }
      outputs[
        `traefik.http.routers.${name}.rule`
      ] = `PathPrefix(\`${prefix}\`)`;

      if (stripPrefix) {
        stripPrefixes.push(prefix);
      }
    });

    outputs = {
      ...outputs,
      [`traefik.http.services.${name}.loadbalancer.server.port`]: `${this.getPort()}`,
      'traefik.enable': 'true',
    };

    // If at least one path has stripPrefix, we need to add the stripPrefix middleware
    if (stripPrefixes.length > 0) {
      outputs[
        `traefik.http.middlewares.${name}-stripprefix.stripprefix.prefixes`
      ] = `${stripPrefixes.join(',')}`;
    }
    return outputs;
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
    const prefixes: HttpContainerPathPrefixConfig[] = Array.isArray(
      this.config.path,
    )
      ? this.config.path
      : [this.config.path];

    const output = [];
    const name = this.getRouterName();

    // If at least one path has stripPrefix, we need to add the stripPrefix middleware
    if (prefixes.find(({ stripPrefix }) => stripPrefix)) {
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
