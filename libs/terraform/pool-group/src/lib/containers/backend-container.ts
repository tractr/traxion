import { ContainerConfig, ContainerDefinition } from '../interfaces';
import { Container } from './container';

/**
 * This container is meant to be used by another one, as its backend
 * For example, Postgres which is used by the API
 */
export abstract class BackendContainer<
  T extends ContainerConfig = ContainerConfig,
> extends Container<T> {
  /**
   * Not configurable because it is related to the Docker image
   * Network mode Bridge is not compatible with Fargate.
   * Therefore containerPort and hostPort must be the same
   */
  protected abstract getPort(): number;

  getDefinition(): ContainerDefinition {
    return {
      ...super.getDefinition(),
      portMappings: [{ containerPort: this.getPort() }],
    };
  }
}
