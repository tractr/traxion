export type MessageBrokerPublishParams<T> = {
  routingKey: string;
  message: T;
  options?: any;
};

export interface MessageBrokerService<T> {
  publish: (params: MessageBrokerPublishParams<T>) => Promise<void>;
}
