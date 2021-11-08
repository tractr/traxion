export type MessageBrokerPublishParams<T> = {
  routingKey: string;
  message: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
};

export interface MessageBrokerService<T> {
  publish: (params: MessageBrokerPublishParams<T>) => Promise<void>;
}
