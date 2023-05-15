export interface IEventPublisher {
    publish<T>(eventName: string, event: T): Promise<void>
}